import conf from "../../config/apiConfig";
import ThreeDots from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../utils/dateTime";
import { useAuth, useProfile } from "../../hook";

const BlogItem = ({
    blog,
    onActionToggle,
    selectedBlogId,
    onDeleteBlog,
    onEdit,
}) => {
    const { auth } = useAuth();
    const { state, dispatch } = useProfile();
    const thumbnail = `${conf.baseURL}/uploads/blog`;

    const isCurrentUser = state?.user?.id === auth?.user?.id;
    const user = isCurrentUser ? state?.user : blog?.author;

    return (
        <div>
            <Link to={`/blog-details/${blog.id}`}>
                <>
                    <div key={blog.id} className="blog-card">
                        <img
                            className="blog-thumb"
                            src={`${thumbnail}/${blog.thumbnail}`}
                            alt={blog.title}
                        />
                        <div className="mt-2 relative">
                            <div className="flex justify-between">
                                <h3 className="text-slate-300 text-xl lg:text-2xl hover:underline">
                                    <Link to={`/blog-details/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </h3>
                                {auth?.user?.id === state?.user?.id && (
                                    <>
                                        <div className="absolute right-0 top-0 block">
                                            <button
                                                onClick={(e) =>
                                                    onActionToggle(blog.id, e)
                                                }
                                                className=""
                                            >
                                                <img src={ThreeDots} alt="" />
                                            </button>
                                            <div
                                                className={`${
                                                    selectedBlogId === blog.id
                                                        ? "action-modal-container block"
                                                        : "hidden"
                                                }`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        onEdit(blog.id)
                                                    }
                                                    className={`action-menu-item hover:text-lwsGreen`}
                                                >
                                                    <img
                                                        src={EditIcon}
                                                        alt="Edit"
                                                    />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        onDeleteBlog(blog.id, e)
                                                    }
                                                    className="action-menu-item hover:text-red-500"
                                                >
                                                    <img
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                    />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <p className="mb-6 text-base text-slate-500 mt-1">
                                {blog.content.slice(0, 150) + "..."}
                            </p>
                            {/* Meta Informations */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center capitalize space-x-2">
                                    <div className="avater-img bg-orange-600 text-white overflow-hidden">
                                        {user.avatar ? (
                                            <img
                                                src={`${conf.baseURL}/uploads/avatar/${user?.avatar}`}
                                                alt={blog.title}
                                                className="w-full h-full"
                                            />
                                        ) : (
                                            <span>
                                                {blog?.author?.firstName[0].toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="text-slate-500 text-sm">
                                            <Link
                                                to={`/profile/${blog.author.id}`}
                                            >
                                                {blog?.author.firstName}{" "}
                                                {blog?.author.lastName}
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
                                    <span>{blog?.likes?.length} Likes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Link>
        </div>
    );
};

export default BlogItem;
