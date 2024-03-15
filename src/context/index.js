import { createContext } from "react";

const AuthContext = createContext();
const ProfileContext = createContext();
const BlogContext = createContext();
const BlogToEdit = createContext();
const AvatarContext = createContext();
const JWTExpireContext = createContext();

export {
    AuthContext,
    ProfileContext,
    BlogContext,
    BlogToEdit,
    AvatarContext,
    JWTExpireContext,
};
