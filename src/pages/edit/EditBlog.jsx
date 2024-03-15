import { useEffect, useRef, useState } from "react";
import Field from "../../components/form/Field";
import Loading from "../../components/loading/Loading";
import Portal from "../../components/portal/Portal";
import BottomModal from "../../components/ui/BottomModal";
import conf from "../../config/apiConfig";
import { useForm } from "react-hook-form";
import { useAuth, useAxiosInterceptor, useEditBlog } from "../../hook";
import { Link, useNavigate } from "react-router-dom";
import Thumbnail from "../../components/thumbnail/Thumbnail";

const EditBlog = () => {
    const { api } = useAxiosInterceptor();
    const { auth } = useAuth();
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbUrl, setThumbUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const { editState } = useEditBlog();
    const [isEdit, setIsEdit] = useState(Object.is(editState.blog, null));
    const [blogToEdit, setBlogToEdit] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const fetchBlogToEdit = async () => {
        try {
            const response = await api.get(
                `${conf.baseURL}/blogs/${editState.blog}`
            );
            console.log(response);
            if (response.status === 200) {
                setBlogToEdit(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isEdit) {
            fetchBlogToEdit();
        }
    }, [isEdit]);

    useEffect(() => {
        if (!isEdit && blogToEdit) {
            reset({
                title: blogToEdit.title,
                tags: blogToEdit.tags,
                content: blogToEdit.content,
            });
        }
    }, [isEdit, blogToEdit, reset]);

    const handleBlogEdit = async (formData) => {
        const editedBlog = new FormData();

        for (const key in formData) {
            editedBlog.append(key, formData[key]);
        }

        if (thumbnail) {
            editedBlog.append("thumbnail", thumbnail);
        }

        if (auth.accessToken) {
            try {
                setLoading(true);
                const response = await api.patch(
                    `${conf.baseURL}/blogs/${editState?.blog}`,
                    editedBlog
                );

                console.log(response);

                if (response.status === 200) {
                    setSuccessMsg("Blog Edited");
                    setTimeout(() => {
                        setSuccessMsg("");
                        navigate(`/blog-details/${response.data.id}`);
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
                setErrorMsg(`Failed to edit Blog. ${error.message}`);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    };

    let content;
    if (loading) {
        content = <Loading />;
    } else {
        content = (
            <form
                onSubmit={handleSubmit(handleBlogEdit)}
                action="#"
                method="POST"
                className="createBlog"
            >
                <Thumbnail
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                    thumbUrl={thumbUrl}
                    setThumbUrl={setThumbUrl}
                    blogToEdit={blogToEdit}
                />

                <div className="mb-6">
                    <Field error={errors.title}>
                        <input
                            {...register("title", {
                                required: "Title is Required",
                            })}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your blog title"
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field error={errors.tags}>
                        <input
                            {...register("tags", {
                                required: "Include at least one tag",
                            })}
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field error={errors.content}>
                        <textarea
                            {...register("content", {
                                required: "Content is required",
                            })}
                            id="content"
                            name="content"
                            placeholder="Write your blog content"
                            rows={8}
                        />
                    </Field>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                    Save Updates
                </button>
            </form>
        );
    }

    return (
        <>
            {content}
            <Portal>
                <BottomModal isOpen={error} setIsOpen={setError}>
                    {errorMsg ? (
                        <p> {errorMsg}</p>
                    ) : (
                        <span>
                            You are not currently logged In. Please{" "}
                            <Link to="/login" className="underline font-bold">
                                Log In
                            </Link>{" "}
                            to create a blog.
                        </span>
                    )}
                </BottomModal>
            </Portal>

            <Portal>
                <BottomModal
                    isOpen={successMsg}
                    setIsOpen={setSuccessMsg}
                    status={"success"}
                >
                    <span>{successMsg}</span>
                </BottomModal>
            </Portal>
        </>
    );
};

export default EditBlog;
