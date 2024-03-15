import { useState } from "react";
import { JWTExpireContext } from "../context";

const JWTProvider = ({ children }) => {
    const [isJwtExpire, setIsJwtExpire] = useState(false);

    return (
        <JWTExpireContext.Provider value={{ isJwtExpire, setIsJwtExpire }}>
            {children}
        </JWTExpireContext.Provider>
    );
};

export default JWTProvider;
