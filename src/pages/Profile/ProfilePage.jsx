import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import conf from "../../config/apiConfig";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { useProfile } from "../../hook/useProfile";
import { actions } from "../../reducers/actions";
import BlogList from "../../components/profile/BlogList";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

const ProfilePage = ({ blog }) => {
    const { id } = useParams();
    const { api } = useAxiosInterceptor();
    const { auth } = useAuth();
    const { state, dispatch } = useProfile();
    const [noUser, setNoUser] = useState("");

    const { loading, error, user } = state;

    const ID = id ?? auth?.user?.id;

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        const fetchProfile = async () => {
            dispatch({ type: actions.profile.DATA_FETCHING });

            try {
                const response = await api.get(`${conf.baseURL}/profile/${ID}`);

                if (!response) {
                    setNoUser(`No user found with id: ${ID}`);
                }

                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.DATA_FETCHED,
                        payload: response.data,
                    });
                }
            } catch (error) {
                console.log(error);

                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchProfile();
    }, [ID, dispatch, api]);

    let content;

    if (loading) {
        content = <Loading />;
    }

    if (!loading && error) {
        content = content = <Error />;
    }

    if (!loading && !error && noUser) {
        content = content = <Error errorMessage={noUser} />;
    }

    if (!loading && !error && state?.user) {
        content = (
            <div className="container">
                <ProfileInfo />
                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <BlogList />
            </div>
        );
    }

    return <main className="mx-auto max-w-[1020px] py-8">{content}</main>;
};

export default ProfilePage;
