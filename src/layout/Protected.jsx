import { useEffect, useState } from "react";
import { useAuth } from "../hook/index";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import useJwtEx from "../hook/useJwtEx";

const Protected = ({ children, authentication = true }) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const { isJwtExpire } = useJwtEx();

    useEffect(() => {
        if (isJwtExpire) {
            localStorage.removeItem("user");
            setAuth({});
        }
    }, [isJwtExpire, setAuth]);

    useEffect(() => {
        if (authentication && !auth?.accessToken && !loader) {
            navigate("/login");
        }
        setLoader(false);
    }, [authentication, auth?.accessToken, navigate, loader]);

    return loader ? (
        <>
            <Loading height={"80vh"} />
        </>
    ) : (
        <>{children}</>
    );
};

export default Protected;
