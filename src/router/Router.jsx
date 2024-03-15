import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Protected from "../layout/Protected";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import ProfilePage from "../pages/Profile/ProfilePage";
import BlogDetails from "../pages/blog-details/BlogDetails";
import WriteBlog from "../pages/write/WriteBlog";
import EditBlog from "../pages/edit/EditBlog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/blog-details/:id",
                element: (
                    <Protected authentication={false}>
                        <BlogDetails />
                    </Protected>
                ),
            },
            {
                path: "/profile/:id",
                element: (
                    <Protected authentication={true}>
                        <ProfilePage />
                    </Protected>
                ),
            },
            {
                path: "/write",
                element: (
                    <Protected authentication={true}>
                        <WriteBlog />,
                    </Protected>
                ),
            },
            {
                path: "/edit",
                element: (
                    <Protected authentication={true}>
                        <EditBlog />,
                    </Protected>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: (
            <Protected authentication={false}>
                <Login />
            </Protected>
        ),
    },
    {
        path: "/register",
        element: (
            <Protected authentication={false}>
                <Registration />
            </Protected>
        ),
    },
]);

const Router = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default Router;
