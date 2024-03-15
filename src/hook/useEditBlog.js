import { useContext } from "react";
import { BlogToEdit } from "../context";

export const useEditBlog = () => {
    return useContext(BlogToEdit);
};
