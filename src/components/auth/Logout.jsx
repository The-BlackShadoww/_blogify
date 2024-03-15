import { useAuth } from "../../hook";
import { TbLogout } from "react-icons/tb";

const Logout = () => {
    const { setAuth } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setAuth({});
    };

    return (
        <button onClick={handleLogout} className="mt-2">
            <TbLogout size={26} />
        </button>
    );
};

export default Logout;
