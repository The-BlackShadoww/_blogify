import { useNavigate } from "react-router-dom";
import conf from "../../config/apiConfig";
import { useState } from "react";
import { actions } from "../../reducers/actions";
import BlogItem from "./BlogItem";
import Portal from "../../components/portal/Portal";
import BottomModal from "../../components/ui/BottomModal";
import {
    useAuth,
    useEditBlog,
    useProfile,
    useAxiosInterceptor,
} from "../../hook/index";

const BlogList = () => {
    const { state, dispatch } = useProfile();
    const { auth } = useAuth();
    const { editDispatch } = useEditBlog();
    const navigate = useNavigate();
    const { api } = useAxiosInterceptor();
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [authStatus, setAuthStatus] = useState("");

    let content;

    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const handleActionToggle = (blogId, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedBlogId(selectedBlogId === blogId ? null : blogId);
    };

    const handleEdit = (blogId) => {
        editDispatch({
            type: actions.edit.EDIT_BLOG,
            payload: blogId,
        });

        navigate("/edit");
    };

    const handleDeleteBlog = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (auth?.accessToken) {
            if (confirm("Do you really want to delete the Blog?")) {
                try {
                    const response = await api.delete(
                        `${conf.baseURL}/blogs/${id}`
                    );

                    const deletedBlog = state.user.blogs.filter(
                        (blog) => blog.id !== id
                    );

                    console.log(deletedBlog);

                    if (response.status === 200) {
                        dispatch({
                            type: actions.profile.BLOG_DELETED,
                            payload: deletedBlog,
                        });
                        setDeleteSuccess(true);
                    }
                } catch (error) {
                    console.log(error);
                    setErrorMsg(error.message);
                    setDeleteError(true);
                }
            }
        } else {
            console.log("not logged in");
            setAuthStatus("You are not logged IN");
        }
    };

    if (state?.user?.blogs?.length > 0) {
        content = state?.user?.blogs.map((blog) => (
            <BlogItem
                key={blog.id}
                blog={blog}
                selectedBlogId={selectedBlogId}
                onActionToggle={handleActionToggle}
                onDeleteBlog={handleDeleteBlog}
                onEdit={handleEdit}
            />
        ));
    } else {
        content = <p> Your Blogs will be shown here</p>;
    }

    return (
        <div className="my-6 space-y-4">
            {content}
            <Portal>
                <BottomModal
                    isOpen={deleteSuccess}
                    setIsOpen={setDeleteSuccess}
                >
                    <p>Blog Deleted</p>
                </BottomModal>
            </Portal>{" "}
            <Portal>
                <BottomModal isOpen={deleteError} setIsOpen={setDeleteError}>
                    <p>Failed to delete blog. {errorMsg}</p>
                </BottomModal>
            </Portal>
        </div>
    );
};

export default BlogList;
