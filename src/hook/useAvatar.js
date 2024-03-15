import { useContext } from "react";
import { AvatarContext } from "../context";

export const useAvatar = () => {
    return useContext(AvatarContext);
};
