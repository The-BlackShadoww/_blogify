import { useState } from "react";
import { Link } from "react-router-dom";
import ThreeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import conf from "../../config/apiConfig";
import { useAuth, useBlog, useAvatar } from "../../hook";
import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import { actions } from "../../reducers/actions";
import BottomModal from "../ui/BottomModal";

const CommentList = ({ blog }) => {
    const { state, dispatch } = useBlog();
    const { auth } = useAuth();
    const { myAvatar } = useAvatar();
    const { api } = useAxiosInterceptor();
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDelete = (commentId) => {
        setDeleteError("");
        setShowDelete(!showDelete);
        setSelectedCommentId(commentId);
    };

    const handleCommentDelete = async (commentId) => {
        try {
            const response = await api.delete(
                `${conf.baseURL}/blogs/${state?.blogs?.id}/comment/${commentId}`
            );
            console.log(response.data);

            if (response.status === 200) {
                setDeleteError("");
                dispatch({
                    type: actions.blog.COMMENT_DELETED,
                    payload: response.data,
                });
            }
        } catch (error) {
            console.log(error);
            setDeleteError(error.message);
        }
    };

    let content = state?.blogs?.comments?.map((comment) => (
        <div key={comment?.id} className="flex items-start space-x-4 my-8">
            <div className="avater-img bg-orange-600 text-white overflow-hidden">
                {comment.author.avatar || myAvatar ? (
                    <img
                        src={`${conf.baseURL}/uploads/avatar/${
                            comment.author.id === auth?.user?.id && myAvatar
                                ? myAvatar
                                : comment.author.avatar
                        }`}
                        className="w-full h-full"
                    />
                ) : (
                    <span>{comment.author.firstName[0].toUpperCase()}</span>
                )}
            </div>
            <div className="w-full relative">
                <h5 className="text-slate -500 font-bold hover:underline flex justify-between">
                    <Link to={`/profile/${comment.author.id}`}>
                        {comment.author.firstName} {comment.author.lastName}
                    </Link>
                    <div
                        className={`${
                            auth?.user?.id === comment.author.id
                                ? "block"
                                : "hidden"
                        }`}
                    >
                        <div
                            className={`${
                                showDelete && selectedCommentId === comment.id
                                    ? "absolute right-6 -top-5 block"
                                    : "hidden"
                            }`}
                        >
                            <div className={`action-modal-container`}>
                                <button
                                    onClick={() =>
                                        handleCommentDelete(comment.id)
                                    }
                                    className="action-menu-item hover:text-red-500"
                                >
                                    <img src={DeleteIcon} alt="Delete" />
                                    Delete
                                </button>
                            </div>
                        </div>
                        <button onClick={() => handleShowDelete(comment.id)}>
                            <img src={ThreeDots} alt="three dots" />
                        </button>
                    </div>
                </h5>
                <p className="text-slate-300">
                    {typeof comment.content === "object"
                        ? comment.content.comment
                        : comment.content}
                </p>
            </div>
            <BottomModal isOpen={deleteError} setIsOpen={setDeleteError}>
                <span className={``}>Failed to delete. {deleteError}</span>
            </BottomModal>
        </div>
    ));

    return <>{content}</>;
};

export default CommentList;
