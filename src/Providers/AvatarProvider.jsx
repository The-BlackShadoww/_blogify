import { useState } from "react";
import { AvatarContext } from "../context";

const AvatarProvider = ({ children }) => {
    const [myAvatar, setMyAvatar] = useState();
    return (
        <AvatarContext.Provider value={{ myAvatar, setMyAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};

export default AvatarProvider;
