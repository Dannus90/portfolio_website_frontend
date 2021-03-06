import React from "react";
import "./navbar.style.scss";
import { connect } from "react-redux";
import Logo from "../../assets/logo/LogoReal.png";
import Popup from "../../UI/Popup/Popup.component";
import NavButton from "../../UI/NavButton/NavButton.component";
import LoginButton from "../../UI/LoginButton/LoginButton.component";
import RegisterButton from "../../UI/RegisterButton/RegisterButton.component";
import CenterNav from "../../components/center-nav/center-nav.component";
import SignoutButton from "../../UI/SignoutButton/SignoutButton.component";
import { Link } from "react-router-dom";
import { removePopup } from "../../redux/navigation/navigation.actions";

const Navbar = (props) => {
    const patternLogin = /login$/;
    const patternRegister = /register$/;

    return (
        <div
            className="navbar-container"
            style={props.show ? { position: "fixed" } : null}
        >
            <div className="navbar-container__logo-container">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="main-logo"
                        width="250px"
                        height="75px"
                        onClick={props.removePopup}
                    />
                </Link>
            </div>
            {props.isAuthenticated ? (
                <div className="signed-in-container">
                    <SignoutButton user={props.loggedInMessage.split(" ", 1)} />
                </div>
            ) : null}

            {patternLogin.test(window.location.href) &&
            !props.isAuthenticated ? (
                <div className="navbar-authcontainer">
                    <RegisterButton />
                </div>
            ) : patternRegister.test(window.location.href) &&
              !props.isAuthenticated ? (
                <div className="navbar-authcontainer">
                    <LoginButton />
                </div>
            ) : null}
            {!patternRegister.test(window.location.href) &&
            !patternLogin.test(window.location.href) &&
            !props.isAuthenticated ? (
                <div className="navbar-authcontainer">
                    <LoginButton />
                    <RegisterButton />
                </div>
            ) : null}
            <CenterNav />
            <NavButton />
            <Popup />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
        loggedInMessage: state.authReducer.loggedInMessage,
        isAuthenticated: state.authReducer.isAuthenticated,
        expiresAt: state.authReducer.expiresAt,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removePopup: () => dispatch(removePopup()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
