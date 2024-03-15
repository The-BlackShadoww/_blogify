import { useRef } from "react";
import { useEditBlog } from "../../hook";
import conf from "../../config/apiConfig";

const Thumbnail = ({
    thumbnail,
    setThumbnail,
    thumbUrl,
    setThumbUrl,
    isThumbMissing,
    setIsThumbMissing,
    blogToEdit,
}) => {
    const thumbRef = useRef();
    const { editState } = useEditBlog();

    const handleThumbUpload = (e) => {
        e.preventDefault();
        thumbRef.current.addEventListener("change", uploadBlogThumb);
        thumbRef.current.click();
    };

    const uploadBlogThumb = () => {
        const thumbnailFiles = thumbRef.current.files;

        if (thumbnailFiles.length > 0) {
            setThumbnail(thumbnailFiles[0]);

            const imgUrl = URL.createObjectURL(thumbnailFiles[0]);
            setThumbUrl(imgUrl);
        }
    };

    let content;

    if (editState?.blog) {
        content = (
            <>
                <div className="max-h-96 overflow-hidden mb-6">
                    <img
                        src={
                            thumbUrl
                                ? thumbUrl
                                : `${conf.baseURL}/uploads/blog/${blogToEdit?.thumbnail}`
                        }
                        className="w-full object-cover bg-center"
                    />
                </div>
                <div className="text-end">
                    <button
                        onClick={handleThumbUpload}
                        className="bg-orange-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-orange-700 transition-all duration-200"
                    >
                        Change Thumb
                    </button>
                    <input id="thumb" type="file" ref={thumbRef} hidden />
                </div>
            </>
        );
    } else {
        content = (
            <>
                {" "}
                {thumbnail ? (
                    <>
                        <div className="max-h-96 overflow-hidden mb-6">
                            <img
                                src={thumbUrl}
                                className="w-full object-cover bg-center"
                            />
                        </div>
                        <div className="text-end">
                            <button
                                onClick={handleThumbUpload}
                                className="bg-orange-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-orange-700 transition-all duration-200"
                            >
                                Change Thumb
                            </button>
                            <input
                                id="thumb"
                                type="file"
                                ref={thumbRef}
                                hidden
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 overflow-hidden">
                            <button
                                onClick={handleThumbUpload}
                                className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                <p>Upload Your Image</p>
                            </button>

                            <input
                                id="thumb"
                                name="thumb"
                                type="file"
                                ref={thumbRef}
                                hidden
                            />
                        </div>
                        <span className="text-red-600">{isThumbMissing}</span>
                    </>
                )}
            </>
        );
    }

    return <div>{content}</div>;
};

export default Thumbnail;
