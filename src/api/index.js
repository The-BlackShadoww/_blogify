import axios from "axios";
import conf from "../config/apiConfig";

export const api = axios.create({
    baseURL: conf.baseURL,
});
