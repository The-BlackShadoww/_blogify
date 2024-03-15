import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import conf from "../../config/apiConfig";
import Logo from "../../assets/blogify.png";
import SearchIcon from "../../assets/icons/search.svg";
import { useAvatar, useEditBlog } from "../../hook";
import { actions } from "../../reducers/actions";
import { useEffect, useState } from "react";
import SearchModal from "../search/SearchModal";
import Portal from "../portal/Portal";
import Logout from "../auth/Logout";

const Nav = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [isSearch, setIsSearch] = useState(false);
    const { editDispatch } = useEditBlog();
    const [scrollY, setScrollY] = useState(window.pageYOffset);
    const { myAvatar } = useAvatar();

    useEffect(() => {
        const pageY = () => {
            setScrollY(window.pageYOffset);
        };

        window.addEventListener("scroll", pageY);

        return () => window.removeEventListener("scroll", pageY);
    }, []);

    const avatar = myAvatar ? myAvatar : auth?.user?.avatar;

    const handleBlogWrite = () => {
        editDispatch({
            type: actions.edit.EDIT_BLOG,
            payload: null,
        });
        navigate("/write");
    };

    let content;

    if (auth?.user) {
        content = (
            <div>
                <ul className="flex items-center space-x-5">
                    <li>
                        <button
                            onClick={handleBlogWrite}
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Write
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsSearch(true)}
                        >
                            <img alt="Search" src={SearchIcon} />
                            <span>Search</span>
                        </button>
                    </li>
                    <li>
                        <Logout />
                    </li>
                    <li className="flex items-center">
                        <div className="avater-img bg-orange-600 text-white overflow-hidden">
                            {avatar ? (
                                <img
                                    src={`${conf.baseURL}/uploads/avatar/${avatar}`}
                                    className="w-full h-full"
                                />
                            ) : (
                                <span className="capitalize">
                                    {auth?.user?.firstName[0]}
                                </span>
                            )}
                        </div>
                        <Link to={`/profile/${auth?.user?.id}`}>
                            <span className="text-white ml-2">
                                {auth?.user?.firstName} {auth?.user?.lastName}
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        content = (
            <div>
                <ul className="flex items-center space-x-5">
                    <li>
                        <Link
                            to={"/write"}
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Write
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="text-white/50 hover:text-white transition-all duration-200"
                            to={"/login"}
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <>
            <header>
                {/* <nav className="container"> */}
                <nav
                    className={`${
                        scrollY > 60
                            ? "fixed top-0 left-[50%] container mx-auto -translate-x-[50%] bg-[#030317] shadow-sm shadow-[#030317] z-10"
                            : "container"
                    }`}
                >
                    <div>
                        <Link to="/">
                            <img alt="lws" className="w-32" src={Logo} />
                        </Link>
                    </div>
                    {content}
                </nav>
            </header>
            <Portal>
                <SearchModal isSearch={isSearch} setIsSearch={setIsSearch} />
            </Portal>
        </>
    );
};

export default Nav;

// ! current code
// import { Link } from "react-router-dom";
// import { useAuth } from "../../hook/useAuth";
// import { useProfile } from "../../hook/useProfile";
// import conf from "../../config/apiConfig";
// import Logo from "../../assets/logo.svg";
// import SearchIcon from "../../assets/icons/search.svg";

// const Nav = () => {
//     const { auth } = useAuth();
//     const { state } = useProfile();
//     console.log(auth);
//     console.log(state);

//     const logedInUser = state?.user?.id === auth?.user?.id;

//     let user;

//     if (logedInUser) {
//         user = state?.user;
//     } else {
//         user = auth?.user;
//     }

//     const handleBlogWrite = () => {

//     }

//     let content;

//     if (auth?.user) {
//         content = (
//             <div>
//                 <ul className="flex items-center space-x-5">
//                     <li>
//                         <Link
//                             to={"/write"}
//                             className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
//                         >
//                             Write
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             className="flex items-center gap-2 cursor-pointer"
//                             to=""
//                         >
//                             <img alt="Search" src={SearchIcon} />
//                             <span>Search</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             className="text-white/50 hover:text-white transition-all duration-200"
//                             to={"/login"}
//                         >
//                             Logout
//                         </Link>
//                     </li>
//                     <li className="flex items-center">
//                         <div className="avater-img bg-orange-600 text-white overflow-hidden">
//                             {user?.avatar ? (
//                                 <img
//                                     src={`${conf.baseURL}/uploads/avatar/${user?.avatar}`}
//                                     className="w-full h-full"
//                                 />
//                             ) : (
//                                 <span className="capitalize">
//                                     {auth?.user?.firstName[0]}
//                                 </span>
//                             )}
//                         </div>
//                         <Link to={`/profile/${auth?.user?.id}`}>
//                             <span className="text-white ml-2">
//                                 {auth?.user?.firstName} {auth?.user?.lastName}
//                             </span>
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         );
//     } else {
//         content = (
//             <div>
//                 <ul className="flex items-center space-x-5">
//                     <li>
//                         <Link
//                             to={"/write"}
//                             className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
//                         >
//                             Write
//                         </Link>
//                     </li>

//                     <li>
//                         <Link
//                             className="text-white/50 hover:text-white transition-all duration-200"
//                             to={"/login"}
//                         >
//                             Login
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         );
//     }

//     return (
//         <header>
//             <nav className="container">
//                 <div>
//                     <Link to="/">
//                         <img alt="lws" className="w-32" src={Logo} />
//                     </Link>
//                 </div>
//                 {content}
//             </nav>
//         </header>
//     );
// };

// export default Nav;
