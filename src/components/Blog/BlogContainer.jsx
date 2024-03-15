import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { getBlogs } from "../../service/blogService";
import { useAuth, useAxiosInterceptor } from "../../hook";
import conf from "../../config/apiConfig";
import SearchModal from "../search/SearchModal";
import Loading from "../loading/Loading";
import Error from "../error/Error";

const BlogContainer = () => {
    const [page, setPage] = useState(1);
    const [isMore, setIsMore] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const observedRef = useRef(null);
    const { auth } = useAuth();
    const { api } = useAxiosInterceptor();
    const [isNewDataFetched, setIsNewDataFetched] = useState(false);
    const [latestFetchedBlogs, setLatestFetchedBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await getBlogs(page);

            if (!response) {
                setError("Failed to fetch data");
            }
            const data = await response.data;

            if (data.blogs?.length === 0) {
                setIsMore(false);
            } else {
                setLatestFetchedBlogs(data.blogs);
                setPage((prev) => prev + 1);
                setIsNewDataFetched(true);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteBlog = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (auth?.accessToken) {
            if (window.confirm("Do you really want to delete the Blog?")) {
                try {
                    const response = await api.delete(
                        `${conf.baseURL}/blogs/${id}`
                    );
                    console.log(response);
                    if (response.status === 200) {
                        const newBlogArray = blogs.filter(
                            (blog) => blog.id !== id
                        );
                        console.log(newBlogArray);
                        setBlogs(newBlogArray);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            console.log("not logged in");
        }
    };
    useEffect(() => {
        const onInterSection = (items) => {
            const observedItem = items[0];

            if (observedItem.isIntersecting && isMore) {
                fetchBlogs();
            }
        };

        const observer = new IntersectionObserver(onInterSection);

        if (observer && observedRef.current) {
            observer.observe(observedRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [isMore, page]);

    useEffect(() => {
        if (isNewDataFetched) {
            setBlogs((prevBlogs) => [...prevBlogs, ...latestFetchedBlogs]);
            setIsNewDataFetched(false);
        }
    }, [isNewDataFetched, latestFetchedBlogs]);

    return (
        <div className="space-y-3 md:col-span-5">
            {loading && <Loading />}
            {error && (
                <Error errorMessage={`Failed to fetch blogs. ${error}`} />
            )}
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    onDeleteBlog={handleDeleteBlog}
                />
            ))}
            {isMore && (
                <div
                    className={`${error || loading ? "hidden" : "block"}`}
                    ref={observedRef}
                >
                    Loading more...
                </div>
            )}
            {!isMore && <div>No more blogs....</div>}
            <SearchModal />
        </div>
    );
};

export default BlogContainer;
