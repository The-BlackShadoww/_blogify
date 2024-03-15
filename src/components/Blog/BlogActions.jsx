import LikeIcon from "../../assets/icons/like.svg";
import LikeFilledIcon from "../../assets/icons/like-filled.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import HeartFilledIcon from "../../assets/icons/heart-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import { useBlog } from "../../hook/useBlog";
import { useAuth } from "../../hook/useAuth";
import { useAxiosInterceptor } from "../../hook";
import conf from "../../config/apiConfig";
import { actions } from "../../reducers/actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import BottomModal from "../ui/BottomModal";

const BlogActions = () => {
    const { state, dispatch } = useBlog();
    const { auth } = useAuth();
    const { api } = useAxiosInterceptor();

    const [likeError, setLikeError] = useState(false);
    const [favoriteError, setFavoriteError] = useState(false);

    const handleLike = async () => {
        if (auth.accessToken) {
            try {
                const response = await api.post(
                    `${conf.baseURL}/blogs/${state?.blogs?.id}/like`
                );
                console.log(response.data);
                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.BLOG_LIKED,
                        payload: response.data,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("not logged in");
            setLikeError(true);
        }
    };

    const handleFavorite = async (blogId) => {
        if (auth.accessToken) {
            try {
                const response = await api.patch(
                    `${conf.baseURL}/blogs/${blogId}/favourite`
                );

                console.log(response);
                console.log(response.data);

                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.BLOG_FAVORITE,
                        payload: response.data,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("not logged in");
            setFavoriteError(true);
        }
    };

    const isLikedBlog = state?.blogs?.likes.find(
        (like) => like.id === auth?.user?.id
    );

    return (
        <>
            <BottomModal isOpen={likeError} setIsOpen={setLikeError}>
                <p>
                    It seems you are not Logged In. Please{" "}
                    <Link to={"/login"} className="underline font-bold">
                        Log In
                    </Link>{" "}
                    to like this blog
                </p>
            </BottomModal>
            <BottomModal isOpen={favoriteError} setIsOpen={setFavoriteError}>
                <p>
                    It seems you are not Logged In. Please{" "}
                    <Link to={"/login"} className="underline font-bold">
                        Log In
                    </Link>{" "}
                    to make this blog as a favorite one.
                </p>
            </BottomModal>

            <div className="floating-action">
                <ul className="floating-action-menus">
                    <li>
                        <button onClick={handleLike}>
                            {isLikedBlog ? (
                                <img src={LikeFilledIcon} alt="like" />
                            ) : (
                                <img src={LikeIcon} alt="like" />
                            )}
                        </button>
                        <span>{state?.blogs?.likes?.length}</span>
                    </li>
                    <li>
                        <button
                            onClick={() => handleFavorite(state?.blogs?.id)}
                        >
                            {auth?.user?.id && state?.blogs?.isFavourite ? (
                                <img
                                    src={HeartFilledIcon}
                                    alt="Favourite-filled"
                                />
                            ) : (
                                <img src={HeartIcon} alt="Favourite" />
                            )}
                        </button>
                    </li>
                    <a href="#comments">
                        <li>
                            <img src={CommentIcon} alt="Comments" />
                            <span>
                                {" "}
                                <span>{state?.blogs?.comments?.length}</span>
                            </span>
                        </li>
                    </a>
                </ul>
            </div>
        </>
    );
};

export default BlogActions;
