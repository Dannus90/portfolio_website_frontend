import React from "react";
import Logo from "../../../assets/logo/darkLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./footer.styles.scss";

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-container-logo">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="main-logo-footer" />
                </Link>
            </div>
            <div className="footer-container-copyright">
                <p className="footer-copyright-text">
                    Copyright &copy; Daniel Persson 2020
                </p>
            </div>
            <div className="footer-container-links">
                <a
                    target="_blank"
                    href="https://github.com/Dannus90"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        className="iconMod-footer"
                        icon={["fab", "github"]}
                        size="2x"
                    />
                </a>

                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/daniel-persson-41a9931a4/"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        className="iconMod-footer"
                        icon={["fab", "linkedin"]}
                        size="2x"
                    />
                </a>

                <a
                    target="_blank"
                    href="https://www.facebook.com/daniel.persson.50364"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        className="iconMod-footer"
                        icon={["fab", "facebook"]}
                        size="2x"
                    />
                </a>

                <a
                    target="_blank"
                    href="https://twitter.com/WebbDevDan"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        className="iconMod-footer"
                        icon={["fab", "twitter"]}
                        size="2x"
                    />
                </a>
            </div>
        </div>
    );
}

export default Footer;
