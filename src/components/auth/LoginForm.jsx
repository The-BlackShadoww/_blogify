import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../form/Field";
import axios from "axios";
import conf from "../../config/apiConfig";
import { useAuth } from "../../hook/useAuth";
import useJwtEx from "../../hook/useJwtEx";

const LoginForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    // console.log(auth);
    const { setIsJwtExpire } = useJwtEx();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const formSubmit = async (formData) => {
        // console.log(formData);
        try {
            const response = await axios.post(
                `${conf.baseURL}/auth/login`,
                formData
            );

            if (response.status === 200) {
                setIsJwtExpire(false);
                const { token, user } = response.data;

                if (token) {
                    const accessToken = token.accessToken;
                    const refreshToken = token.refreshToken;

                    const currentUser = {
                        user: user,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    };

                    localStorage.setItem("user", JSON.stringify(currentUser));

                    console.log(JSON.parse(localStorage.getItem("user")));
                    setAuth(JSON.parse(localStorage.getItem("user")));
                    // setAuth({ user, accessToken, refreshToken });

                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `User with email ${formData.email} is not found`,
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="mb-6">
                    <Field label="Email" error={errors.email}>
                        <input
                            {...register("email", {
                                required: "Email ID is Required",
                            })}
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 `}
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field label="Password" error={errors.password}>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Your password must be at least 8 characters",
                                },
                            })}
                            type="password"
                            id="password"
                            name="password"
                            className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 `}
                        />
                    </Field>
                </div>
                <p className="text-red-600 mb-3">
                    {errors?.root?.random?.message}
                </p>
                <Field>
                    <div className="mb-6">
                        <button className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                            Login
                        </button>
                    </div>
                </Field>

                <p className="text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </>
    );
};

export default LoginForm;
