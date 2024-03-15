import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Field from "../form/Field";
import conf from "../../config/apiConfig";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const submitForm = async (formData) => {
        console.log(formData);
        try {
            let response = await axios.post(
                `${conf.baseURL}/auth/register`,
                formData
            );

            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error.message}`,
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                <div className="mb-6">
                    <Field label="First Name" error={errors.firstName}>
                        <input
                            {...register("firstName", {
                                required: "First Name is Required",
                            })}
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field label="Last Name" error={errors.lastName}>
                        <input
                            {...register("lastName", {
                                required: "Last Name is Required",
                            })}
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </Field>
                </div>
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
                <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        Create Account
                    </button>
                </div>
                <p className="text-center">
                    Already have account?{" "}
                    <Link
                        to={"/login"}
                        className="text-indigo-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
};

export default RegistrationForm;
