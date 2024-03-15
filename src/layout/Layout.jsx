import { Outlet } from "react-router-dom";
import Nav from "../components/navigation/Nav";
// import Footer from "../components/footer/Footer";
// import Footer from "../components/footer/Footer";
import FooterComponent from "../components/footerComponent/FooterComponent";

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <FooterComponent />
        </>
    );
};

export default Layout;
