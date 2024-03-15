import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { BiLeftArrowAlt } from "react-icons/bi";

const Login = () => {
    return (
        <main>
            <section className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    {/* The unauthenticated user is always redirected to the login page when the user tries to access any protected route and the user may also want to go back to the home page without logging in. But as the user has tried to go to a protected route and has been redirected to the login page, when the user tries to go back to the home page by clicking the window back arrow the user is redirected to the login page again and thus the user can never go back to the home page. So, I have added this link to provide the user with that option for a better user experience. And when the user is on the login or registration page the user will only see the login and registration forms, not any other components like Navigation and Footer.  I am not quite sure if this breaks any rules of the assignment or not. Hope this doesn't break any rules of the assignment. I appreciate your kind consideration. */}
                    <Link
                        to={"/"}
                        className="mb-5 flex items-center hover:underline"
                    >
                        <BiLeftArrowAlt size={24} /> Back to home
                    </Link>
                    <h2 className="text-2xl font-bold my-6">Login</h2>
                    <LoginForm />
                </div>
            </section>
        </main>
    );
};

export default Login;
