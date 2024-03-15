import axios from "axios";
import conf from "../config/apiConfig";

export const getBlogs = (page) => {
    const response = axios.get(`${conf.baseURL}/blogs?page=${page}?&limit=5`);

    return response;
};

export const getPopular = () => {
    const response = axios.get(`${conf.baseURL}/blogs/popular`);

    return response;
};
