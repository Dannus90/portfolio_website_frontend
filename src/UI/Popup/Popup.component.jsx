import React from "react";
import "./Popup.style.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleNavigation } from "../../redux/navigation/navigation.actions";

//SOMETHING IS BUGGED DOWN BELOW NEEDS TO GET FIXED!

const Popup = (props) => {
    let windowHome = window.location.href;
    let showHomeLink;

    if (
        /\/$/.test(windowHome) ||
        /\/#about-me$/.test(windowHome) === true ||
        /\/#contact-me$/.test(windowHome) === true
    ) {
        showHomeLink = true;
    } else {
        showHomeLink = false;
    }

    let showGameLink = /\/gamesoverview$/.test(windowHome);
    let showBlogLink;

    if (/\/blog$/.test(windowHome) || /\/blog#$/.test(windowHome)) {
        showBlogLink = true;
    } else {
        showBlogLink = false;
    }

    const conditionalLinkHome = !showHomeLink ? (
        <li>
            <Link
                to="/"
                className="ul-container__link"
                onClick={() => props.toggleNavigationMenu()}
            >
                Home
            </Link>
        </li>
    ) : null;

    const conditionalLinkGames = !showGameLink ? (
        <li>
            <Link
                to="/gamesoverview"
                className="ul-container__link"
                onClick={() => props.toggleNavigationMenu()}
            >
                Minigames
            </Link>
        </li>
    ) : null;

    const conditionalLinkBlog = !showBlogLink ? (
        <li>
            <Link
                to="/blog"
                className="ul-container__link"
                onClick={() => props.toggleNavigationMenu()}
            >
                Blog
            </Link>
        </li>
    ) : null;

    return (
        <div className="wrapper">
            <div
                className="popup"
                style={props.show ? { transform: "scale(80)" } : null}
            ></div>
            <div
                className="ul-container"
                style={
                    props.show
                        ? {
                              animation: "slidein 2s forwards",
                          }
                        : null
                }
            >
                <ul>
                    {conditionalLinkHome}
                    <li>
                        <Link
                            to="#"
                            className="ul-container__link"
                            onClick={() => props.toggleNavigationMenu()}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="ul-container__link"
                            onClick={() => props.toggleNavigationMenu()}
                        >
                            Education
                        </Link>
                    </li>
                    {conditionalLinkGames}
                    {conditionalLinkBlog}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNavigationMenu: () => dispatch(toggleNavigation()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
