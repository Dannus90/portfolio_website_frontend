import React from "react";
import "./homepage.style.scss";
import MainBackground from "../../main-background/main-background.component";
import About from "../../layout/about/about.component";
import Slider from "../../layout/slider/slider.component";
import ContactForm from "../../layout/contact/contact.component";
import Layout from "../../layout/layout/layout.component";

const HomePage = () => {
    return (
        <div className="homepage">
            <Layout>
                <MainBackground />
                <About />
                <Slider />
                <ContactForm />
            </Layout>
        </div>
    );
};

export default HomePage;
