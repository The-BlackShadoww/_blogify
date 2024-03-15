import { useEffect, useState } from "react";
import { getPopular } from "../../service/blogService";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

const PopularContainer = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPopular = async () => {
        try {
            setLoading(true);
            const response = await getPopular();

            if (!response) {
                setError("Failed to fetch data");
            }
            const data = await response.data;

            setBlogs(() => [...data.blogs]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopular();
    }, []);

    let content;

    if (loading) {
        content = <Loading height={"100%"} />;
    } else if (error) {
        content = <p>{error}</p>;
    } else {
        content = blogs?.map((blog) => (
            <li key={blog.id}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                    <Link to={`blog-details/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p className="text-slate-600 text-sm">
                    by{" "}
                    <Link to={`/profile/${blog.author.id}`}>
                        {blog.author.firstName} {blog.author.lastName}
                    </Link>
                    <span>·</span> {blog.likes.length} Likes
                </p>
            </li>
        ));
    }
    return (
        <div className="sidebar-card">
            <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                Most Popular 👍️
            </h3>
            <ul className="space-y-5 my-5">{content}</ul>
        </div>
    );
};

export default PopularContainer;
