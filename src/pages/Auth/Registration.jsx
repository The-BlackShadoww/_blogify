import { BiLeftArrowAlt } from "react-icons/bi";
import RegistrationForm from "../../components/auth/RegistrationForm";
import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <main>
            <section className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <Link
                        to={"/"}
                        className="mb-5 flex items-center hover:underline"
                    >
                        <BiLeftArrowAlt size={24} /> Back to home
                    </Link>
                    <h2 className="text-2xl font-bold my-6">Register</h2>
                    <RegistrationForm />
                </div>
            </section>
        </main>
    );
};

export default Registration;
