import conf from "../../config/apiConfig";
import { Link, useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../utils/dateTime";
import ThreeDots from "../../assets/icons/3dots.svg";
import { useAuth } from "../../hook/useAuth";
import { useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { actions } from "../../reducers/actions";
import { useAvatar, useEditBlog } from "../../hook";

const BlogCard = ({ blog, onDeleteBlog }) => {
    const { auth } = useAuth();
    const { editDispatch } = useEditBlog();
    const [showActions, setShowActions] = useState(false);
    const userId = auth?.user?.id;
    const thumbnail = `${conf.baseURL}/uploads/blog`;
    const { myAvatar } = useAvatar();

    const isMe = auth?.user?.id === blog?.author?.id;
    const avatar = isMe && myAvatar ? myAvatar : blog?.author?.avatar;

    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        editDispatch({
            type: actions.edit.EDIT_BLOG,
            payload: blog.id,
        });

        navigate("/edit");
    };

    const redirectToDetails = () => {
        navigate(`/blog-details/${blog.id}`);
    };

    const handleActionToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowActions(!showActions);
    };

    const navigateToProfile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/profile/${blog.author.id}`);
    };

    return (
        <div className="blog-card">
            <img
                className="blog-thumb"
                src={`${thumbnail}/${blog.thumbnail}`}
                alt={blog.title}
            />
            <div className="mt-2 relative">
                <Link onClick={redirectToDetails}>
                    <h3 className="text-slate-300 text-xl lg:text-2xl">
                        <Link to={``}></Link>
                        <Link to={`/blog-details/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </h3>
                    <p className="mb-6 text-base text-slate-500 mt-1">
                        {blog.content}
                    </p>
                    {/* Meta Information */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center capitalize space-x-2">
                            <div className="avater-img bg-orange-600 text-white overflow-hidden">
                                {avatar ? (
                                    <img
                                        // src={`${conf.baseURL}/uploads/avatar/${blog.author.avatar}`}
                                        src={`${conf.baseURL}/uploads/avatar/${avatar}`}
                                        alt={blog.author.firstName}
                                    />
                                ) : (
                                    <span className="">
                                        {blog.author.firstName[0].toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h5 className="text-slate-500 text-sm">
                                    <Link
                                        onClick={(e) => navigateToProfile(e)}
                                        to={`/profile/${blog.author.id}`}
                                        className="hover:underline"
                                    >
                                        {blog.author.firstName}{" "}
                                        {blog.author.lastName}
                                    </Link>
                                </h5>
                                <div className="flex items-center text-xs text-slate-700">
                                    <span>
                                        {getFormattedDate(
                                            blog.createdAt,
                                            "date",
                                            "inMS"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm px-2 py-1 text-slate-700">
                            <span>{blog.likes.length} Likes</span>
                        </div>
                    </div>

                    {/* action dot */}
                    <div
                        className={`${
                            auth?.user?.id === blog.author.id
                                ? "absolute right-0 top-0 block"
                                : "hidden"
                        } `}
                    >
                        <button
                            onClick={(e) => handleActionToggle(e)}
                            className={`${
                                userId === blog.author.id
                                    ? "block z-10"
                                    : "hidden"
                            }`}
                        >
                            <img src={ThreeDots} alt="3dots of Action" />
                        </button>
                        {/* Action Menus Popup */}
                        <div
                            className={`${
                                showActions
                                    ? "action-modal-container block"
                                    : "hidden"
                            }`}
                        >
                            <button
                                onClick={(e) => handleEdit(e)}
                                className={`action-menu-item hover:text-lwsGreen`}
                            >
                                <img src={EditIcon} alt="Edit" />
                                Edit
                            </button>
                            <button
                                onClick={(e) => onDeleteBlog(blog.id, e)}
                                className="action-menu-item hover:text-red-500"
                            >
                                <img src={DeleteIcon} alt="Delete" />
                                Delete
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
