
import React from "react";
import { Outlet } from "react-router-dom"; // Limpiamos el import de /dist
import ScrollToTop from "../components/ScrollToTop";
import injectContext from "../pages/appContext.jsx";

const Layout = () => {
    return (
        <ScrollToTop>
            <Outlet />
        </ScrollToTop>
    );
};

export default injectContext(Layout);