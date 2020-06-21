import React from "react";
import NavbarSinglePost from "../../navbarSingleBlogPost/navbarSingleBlogPost.component";
import Footer from "../footer/footer.component";

const LayoutSinglePost = ({ children }) => {
    return (
        <>
            <NavbarSinglePost />
            {children}
            <Footer />
        </>
    );
};

export default LayoutSinglePost;
