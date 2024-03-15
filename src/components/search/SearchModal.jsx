import CloseIcon from "../../assets/icons/close.svg";
import { useForm } from "react-hook-form";
import { useAuth, useAxiosInterceptor, useDebounce } from "../../hook";
import conf from "../../config/apiConfig";
import { Fragment, useState } from "react";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

const SearchModal = ({ isSearch, setIsSearch }) => {
    const { auth } = useAuth();
    const { api } = useAxiosInterceptor();
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { register } = useForm();

    const search = useDebounce(async (term) => {
        try {
            setLoading(true);

            const response = await api.get(`${conf.baseURL}/search?q=${term}`);

            if (response.status === 200) {
                setError(false);
                setSearchResults(response.data.data);
            }
        } catch (error) {
            console.log(error);
            setError(true);
            setErrorMsg(`No Blog found with term "${term}"`);
        } finally {
            setLoading(false);
        }
    }, 500);

    const handleSearch = async (term) => {
        console.log(term);

        if (term) {
            if (auth.accessToken) {
                search(term);
            } else {
                setError(true);
                setErrorMsg(`You are not Logged In`);
            }
        } else {
            setSearchResults(null);
        }
    };

    let content;

    if (loading) {
        content = <Loading height={"100%"} />;
    } else if (error) {
        content = (
            <div>
                <p className="text-red-600">{errorMsg}</p>
            </div>
        );
    } else {
        content = searchResults?.map((blog) => (
            <Fragment key={blog.id}>
                <Link
                    to={`blog-details/${blog.id}`}
                    onClick={() => setIsSearch(false)}
                >
                    <div className="flex gap-6 py-2">
                        <img
                            className="h-28 object-contain"
                            src={`${conf.baseURL}/uploads/blog/${blog.thumbnail}`}
                            alt={blog.title}
                        />
                        <div className="mt-2">
                            <h3 className="text-slate-300 text-xl font-bold">
                                {blog.title}
                            </h3>
                            {/* Meta Informations */}
                            <p className="mb-6 text-sm text-slate-500 mt-1">
                                {blog.content}
                            </p>
                        </div>
                    </div>
                </Link>
            </Fragment>
        ));
    }

    return (
        <>
            <section
                className={`${
                    isSearch
                        ? "fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50"
                        : "hidden opacity-0"
                } `}
            >
                {/* Search Container */}
                <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                    {/* Search */}
                    <div>
                        <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
                            Search for Your Desire Blogs
                        </h3>

                        <input
                            {...register("search", {
                                onChange: (e) => {
                                    handleSearch(e.target.value);
                                },
                            })}
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Start Typing to Search"
                            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                        />
                    </div>
                    {/* Search Result */}
                    <div className="">
                        <h3 className="text-slate-400 font-bold mt-6">
                            Search Results {!error && searchResults?.length}
                        </h3>

                        <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                            {content}
                        </div>
                    </div>
                    <button onClick={() => setIsSearch(false)}>
                        <img
                            src={CloseIcon}
                            alt="Close"
                            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
                        />
                    </button>
                </div>
            </section>
        </>
    );
};

export default SearchModal;
