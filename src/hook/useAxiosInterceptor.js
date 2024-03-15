import { useEffect } from "react";
import axios from "axios";
import { api } from "../api";
import conf from "../config/apiConfig";
import { useAuth } from "./useAuth";
import useJwtEx from "./useJwtEx";

const useAxiosInterceptor = () => {
    const { auth, setAuth } = useAuth();
    const { isJwtExpire, setIsJwtExpire } = useJwtEx();
    console.log(isJwtExpire);

    useEffect(() => {
        //! ------ request interceptor --------
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        //! ------- response interceptor -------
        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log(error);
                const originalRequest = error.config;

                if (error.response.status === 500) {
                    //  response: '{"error":"jwt expired"}',
                    console.log("REFRESH_JWT_EXPIRED");
                    setIsJwtExpire(true);
                }

                if (
                    (error.response.status === 401 ||
                        error.response.status === 403) &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;
                        const response = await axios.post(
                            `${conf.baseURL}/auth/refresh-token`,
                            { refreshToken }
                        );

                        console.log(response);

                        if (response.status === 200) {
                            setIsJwtExpire(false);
                        }

                        const { accessToken } = response.data;

                        console.log(`New Token: ${accessToken}`);

                        setAuth({ ...auth, accessToken: accessToken });

                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return axios(originalRequest);
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [auth?.accessToken, auth, setAuth]);

    return { api };
};

export default useAxiosInterceptor;
