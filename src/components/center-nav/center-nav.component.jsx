import React from "react";
import "./center-nav.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import ProfileImage from "../../assets/profile/profile.jpg";

const CenterNav = (props) => {
    return (
        <div
            className="center-nav"
            style={
                props.show
                    ? {
                          backgroundColor: "#14161b",
                      }
                    : null
            }
        >
            <ul className="center-nav__first-ulcontainer">
                <li>
                    <a
                        target="_blank"
                        href="https://github.com/Dannus90"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="iconMod"
                            icon={["fab", "github"]}
                            size="2x"
                        />
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/daniel-persson-41a9931a4/"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="iconMod"
                            icon={["fab", "linkedin"]}
                            size="2x"
                        />
                    </a>
                </li>
            </ul>
            <div className="center-nav__profile-picture-container">
                <img src={ProfileImage} alt="profileimg" />
            </div>
            <ul className="second-ulcontainer">
                <li>
                    <a
                        target="_blank"
                        href="https://www.facebook.com/daniel.persson.50364"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="iconMod"
                            icon={["fab", "facebook"]}
                            size="2x"
                        />
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://twitter.com/WebbDevDan"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            className="iconMod"
                            icon={["fab", "twitter"]}
                            size="2x"
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(CenterNav);
