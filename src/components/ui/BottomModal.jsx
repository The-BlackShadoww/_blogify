import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const BottomModal = ({ isOpen, setIsOpen, children, status, message }) => {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        }
    }, [isOpen, setIsOpen]);

    return (
        <div
            className={`${
                isOpen
                    ? "flex w-auto fixed right-10 bottom-9 shadow-lg shadow-slate-900/60 backdrop-blur-md border border-slate-200/20 p-6 py-4 rounded-full z-10"
                    : "hidden"
            } ${status === "success" ? "bg-green-800/80" : "bg-red-800/80"}`}
        >
            {children}
            {message && message}
            <button onClick={() => setIsOpen(false)}>
                <IoCloseOutline size={24} className="ml-3" />
            </button>
        </div>
    );
};

export default BottomModal;
