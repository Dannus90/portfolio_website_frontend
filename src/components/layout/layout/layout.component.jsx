import React from "react";
import Navbar from "../../navbar/navbar.component";
import Footer from "../footer/footer.component";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
