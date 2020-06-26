import React from "react";
import "./homepage.style.scss";
import MainBackground from "../../main-background/main-background.component";
import About from "../../layout/about/about.component";
import Slider from "../../layout/slider/slider.component";
import ContactForm from "../../layout/contact/contact.component";
import Layout from "../../layout/layout/layout.component";
import { motion } from "framer-motion";
import { pageTransition } from "../../../Utilities/Transitions/Transitions";

const HomePage = () => {
    return (
        <motion.div
            className="homepage"
            exit="out"
            animate="in"
            initial="out"
            variants={pageTransition}
        >
            <Layout>
                <MainBackground />
                <About />
                <Slider />
                <ContactForm />
            </Layout>
        </motion.div>
    );
};

export default HomePage;
