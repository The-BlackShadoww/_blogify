import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    const mountElement = document.getElementById("portal-root");
    const div = document.createElement("div");

    useEffect(() => {
        mountElement.appendChild(div);
        return () => mountElement.removeChild(div);
    }, [div, mountElement]);

    return createPortal(children, div);
};

export default Portal;
