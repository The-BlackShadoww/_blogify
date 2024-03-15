import { ImSpinner8 } from "react-icons/im";

const Loading = ({ loadingMessage, children, height }) => {
    return (
        <div
            className={`max-w-[1050px] w-full h-${
                height ? height : "[80vh]"
            } mx-auto text-center flex justify-center items-center`}
        >
            <ImSpinner8 className="animate-spin" size={35} />
            {children && children}
            {loadingMessage && loadingMessage}
        </div>
    );
};

export default Loading;
