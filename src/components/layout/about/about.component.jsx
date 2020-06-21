import React from "react";
import "./about.styles.scss";
import Profile from "../../../assets/profile/profile2.jpg";

const About = () => {
    return (
        <div className="about-wrapper">
            <div className="about-content-container">
                <div className="about-me-section-1" id="about-me-section-1">
                    <div className="about-header-container">
                        <h2 id="about-me">About</h2>
                        <img
                            src={Profile}
                            alt="profile"
                            className="about-image-small-screen"
                        />
                    </div>
                    <div
                        className="background-text
                    "
                    >
                        <h3 className="background-text-h3">Background</h3>
                        <p className="background-text-paragraph">
                            In the end of february 2020, I decided that I wanted
                            to do a career change. I ended up quitting my job as
                            a sportsmanager and turned my dedication towards
                            web- and application development. For me it was
                            about finding something where I could be stimulated
                            both on a creative and logical level, and where I
                            constantly had to learn new things.
                        </p>
                    </div>
                </div>
                <div className="about-me-section-2">
                    <div className="about-grid-item-1">
                        <div className="overlapping-image-container">
                            <img
                                src={Profile}
                                alt="profile"
                                className="about-image"
                            />
                            <div className="image-shadow"></div>
                        </div>
                    </div>
                    <div className="about-grid-item-2">
                        <h3>Future goals</h3>
                        <p>
                            At the moment I am doing own projects and taking a
                            lot of courses on the internet. After the summer of
                            2020 I will begin studies on the university and my
                            goal is thereafter to land a job within the
                            industry. I am of course interested in a part time
                            job or internship during my education.
                            <br />
                            <br />
                        </p>
                        <h3>Need help with development?</h3>
                        <p>
                            In case you need any help with development please
                            let me know. You will see what technologies I have
                            been working with down below and my{" "}
                            <a href="#contact-me">
                                <span className="contact-span">
                                    contact information
                                </span>
                            </a>{" "}
                            are seen further down on the page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
