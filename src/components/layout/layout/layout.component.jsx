import React from "react";
import Navbar from "../../navbar/navbar.component";
import Footer from "../footer/footer.component";

const Layout = ({ children, history }) => {
    return (
        <>
            <Navbar history={history} />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
