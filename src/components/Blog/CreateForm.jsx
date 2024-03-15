import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import conf from "../../config/apiConfig";
import { useAuth } from "../../hook/useAuth";
import { useAxiosInterceptor } from "../../hook";
import Field from "../form/Field";
import { useState } from "react";
import BottomModal from "../ui/BottomModal";
import Loading from "../loading/Loading";
import Portal from "../portal/Portal";
import Thumbnail from "../thumbnail/Thumbnail";

const CreateForm = () => {
    const { api } = useAxiosInterceptor();
    const { auth } = useAuth();
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbUrl, setThumbUrl] = useState("");
    const [isThumbMissing, setIsThumbMissing] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCreateBlog = async (formData) => {
        console.log(formData);

        const newBlog = new FormData();

        for (const key in formData) {
            newBlog.append(key, formData[key]);
        }

        if (!thumbnail) {
            setIsThumbMissing("Thumbnail is Required");
        } else {
            newBlog.append("thumbnail", thumbnail);
            if (auth?.accessToken) {
                try {
                    setLoading(true);
                    const response = await api.post(
                        `${conf.baseURL}/blogs/`,
                        newBlog
                    );

                    if (response.status === 201) {
                        setSuccessMsg(response.data.message);
                        setTimeout(() => {
                            navigate(`/blog-details/${response.data.blog.id}`);
                            setSuccessMsg("");
                        }, 2000);
                    }
                } catch (error) {
                    console.log(error);
                    setErrorMsg(`Failed to create Blog. ${error.message}`);
                    setError(true);
                    throw error;
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("not logged in");
                setError(true);
            }
        }
    };

    let content;
    if (loading) {
        content = <Loading />;
    } else {
        content = (
            <form
                onSubmit={handleSubmit(handleCreateBlog)}
                action="#"
                method="POST"
                className="createBlog"
            >
                <>
                    <Thumbnail
                        thumbnail={thumbnail}
                        setThumbnail={setThumbnail}
                        thumbUrl={thumbUrl}
                        setThumbUrl={setThumbUrl}
                        isThumbMissing={isThumbMissing}
                        setIsThumbMissing={setIsThumbMissing}
                    />
                </>

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
                    Create Blog
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

export default CreateForm;
