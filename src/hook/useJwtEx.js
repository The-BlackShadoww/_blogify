import { useContext } from "react";
import { JWTExpireContext } from "../context";

const useJwtEx = () => {
    return useContext(JWTExpireContext);
};

export default useJwtEx;
