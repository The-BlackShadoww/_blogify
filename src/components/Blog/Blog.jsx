import { useEffect } from "react";
import { useParams } from "react-router-dom";
import conf from "../../config/apiConfig";
import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import { useBlog } from "../../hook";
import { actions } from "../../reducers/actions";
import BlogContent from "./BlogContent";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import BlogActions from "./BlogActions";
import Error from "../error/Error";
import Loading from "../loading/Loading";

const Blog = () => {
    const { id } = useParams();
    const { api } = useAxiosInterceptor();
    const { state, dispatch } = useBlog();

    useEffect(() => {
        const fetchSingleBlog = async () => {
            dispatch({ type: actions.blog.DATA_FETCHING });
            try {
                const res = await api.get(`${conf.baseURL}/blogs/${id}`);

                if (res.status === 200) {
                    dispatch({
                        type: actions.blog.DATA_FETCHED,
                        payload: res.data,
                    });
                }
            } catch (error) {
                dispatch({
                    type: actions.blog.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchSingleBlog();
    }, [id, api, dispatch]);

    let content;
    if (state?.loading) {
        content = <Loading />;
    } else if (state?.error) {
        content = (
            <Error errorMessage={state.error}>
                <p>Failed to fetch data!</p>{" "}
            </Error>
        );
    } else {
        content = (
            <>
                <main>
                    <BlogContent blog={state?.blogs} />
                    <section id="comments">
                        <div className="mx-auto w-full md:w-10/12 container">
                            <h2 className="text-3xl font-bold my-8">
                                Comments ({state?.blogs?.comments?.length})
                            </h2>
                            <CommentBox />
                            <CommentList blog={state?.blogs} />
                        </div>
                    </section>
                </main>
                <BlogActions />
            </>
        );
    }

    return content;
};

export default Blog;
