import Field from "../form/Field";
import { useForm } from "react-hook-form";
import conf from "../../config/apiConfig";
import { useAuth } from "../../hook/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBlog } from "../../hook/useBlog";
import { actions } from "../../reducers/actions";
import { useAvatar, useAxiosInterceptor } from "../../hook";
import BottomModal from "../ui/BottomModal";

const CommentBox = () => {
    const { auth } = useAuth();
    const { api } = useAxiosInterceptor();
    const { state, dispatch } = useBlog();
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [commentError, setCommentError] = useState("");
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const { myAvatar } = useAvatar();

    const avatar = myAvatar ? myAvatar : auth?.user?.avatar;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const postComment = async (data) => {
        const { comment } = data;

        if (auth.accessToken) {
            try {
                const response = await api.post(
                    `${conf.baseURL}/blogs/${state.blogs.id}/comment`,
                    { content: comment }
                );

                console.log(response.data);

                if (response.status === 200) {
                    setNotLoggedIn(false);
                    setCommentError("");
                    dispatch({
                        type: actions.blog.COMMENT_POSTED,
                        payload: response.data,
                    });

                    setCommentSuccess(true);

                    setTimeout(() => {
                        setCommentSuccess(false);
                    }, 1500);

                    reset();
                }
            } catch (error) {
                console.log(error);
                setCommentError(error.message);
            }
        } else {
            console.log("not loged in");
            setNotLoggedIn(true);
        }
    };

    useEffect(() => {
        reset();
    }, [reset]);

    return (
        <div
            className={`items -center space-x-4 ${
                auth?.accessToken ? "flex" : "hidden"
            }`}
        >
            <div className="avater-img bg-orange-600 text-white overflow-hidden">
                {avatar ? (
                    <img
                        src={`${conf.baseURL}/uploads/avatar/${avatar}`}
                        alt={auth?.author?.firstName}
                        className="w-full h-full"
                    />
                ) : (
                    <span className="capitalize">
                        {auth?.user?.firstName[0]}
                    </span>
                )}
            </div>
            <div className="w-full">
                <form onSubmit={handleSubmit(postComment)}>
                    <Field error={errors.comment}>
                        <textarea
                            {...register("comment", {
                                required: "Write something to make a comment",
                            })}
                            id="comment"
                            name="comment"
                            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                            placeholder="Write a comment"
                            defaultValue={""}
                        />
                    </Field>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>
            <BottomModal isOpen={notLoggedIn} setIsOpen={setNotLoggedIn}>
                <span>
                    You are not currently logged In. Please{" "}
                    <Link to="/login" className="underline font-bold">
                        Log In
                    </Link>{" "}
                    to make a comment.
                </span>
            </BottomModal>
            <BottomModal isOpen={commentError} setIsOpen={setCommentError}>
                <span className={``}>
                    Could not post comment. {commentError}
                </span>
            </BottomModal>
            <BottomModal
                isOpen={commentSuccess}
                setIsOpen={setCommentSuccess}
                status={"success"}
            >
                <span className={``}>Comment Posted</span>
            </BottomModal>
        </div>
    );
};

export default CommentBox;
