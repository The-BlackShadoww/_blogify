import conf from "../../config/apiConfig";
import { useAuth, useAvatar, useBlog } from "../../hook";
import { getFormattedDate } from "../../utils/dateTime";
import { Link } from "react-router-dom";

const BlogContent = ({ blog }) => {
    const { state } = useBlog();
    const tags = state?.blogs?.tags?.split(", ");
    const { auth } = useAuth();
    const { myAvatar } = useAvatar();

    const isMe = auth?.user?.id === state?.blogs?.author?.id;
    const avatar = isMe && myAvatar ? myAvatar : state?.blogs?.author?.avatar;

    return (
        <section>
            <div className="container text-center py-8">
                <h1 className="font-bold text-3xl md:text-5xl">
                    {state?.blogs?.title}
                </h1>
                <div className="flex justify-center items-center my-4 gap-4">
                    <div className="flex items-center capitalize space-x-2">
                        <div className="avater-img bg-orange-600 text-white overflow-hidden">
                            {avatar ? (
                                <img
                                    src={`${conf.baseURL}/uploads/avatar/${avatar}`}
                                    alt={state?.blogs?.author?.firstName}
                                    className="w-full h-full"
                                />
                            ) : (
                                <span>
                                    {state?.blogs?.author?.firstName[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        <h5 className="text-slate-500 text-sm hover:underline">
                            <Link to={`/profile/${state?.blogs?.author?.id}`}>
                                {state?.blogs?.author?.firstName}{" "}
                                {state?.blogs?.author?.lastName}
                            </Link>
                        </h5>
                    </div>
                    <span className="text-sm text-slate-700 dot">
                        {state?.blogs &&
                            getFormattedDate(
                                state?.blogs.createdAt,
                                "date",
                                "inMS"
                            )}
                    </span>
                    <span className="text-sm text-slate-700 dot">
                        {state?.blogs?.likes?.length} Likes
                    </span>
                </div>
                <img
                    className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                    src={`${conf.baseURL}/uploads/blog/${state?.blogs?.thumbnail}`}
                    alt=""
                />
                {/* Tags */}
                <ul className="tags">
                    {tags?.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                {/* Content */}
                <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                    {state?.blogs?.content}
                </div>
            </div>
        </section>
    );
};

export default BlogContent;
