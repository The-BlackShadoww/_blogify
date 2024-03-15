import { useEffect } from "react";
import Router from "./router/Router";
import { useAuth } from "./hook";
import useJwtEx from "./hook/useJwtEx";

function App() {
    const { setAuth } = useAuth();
    const { isJwtExpire } = useJwtEx();

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem("user")));
    }, [setAuth]);

    useEffect(() => {
        if (isJwtExpire) {
            localStorage.removeItem("user");
            setAuth({});
        }
    }, [isJwtExpire, setAuth]);

    return (
        <>
            <Router />
        </>
    );
}

export default App;
