import React from "react";
import "./navbarSingleBlogPost.styles.scss";
import { connect } from "react-redux";
import Logo from "../../assets/logo/LogoReal.png";
import Popup from "../../UI/Popup/Popup.component";
import NavButton from "../../UI/NavButton/NavButton.component";
import { Link } from "react-router-dom";

const NavbarSingleBlogPost = (props) => {
    return (
        <div
            className="navbar-singlePost-container"
            style={props.show ? { position: "fixed" } : null}
        >
            <div className="navbar-singlePost-container__logo-container">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="main-logo" />
                </Link>
            </div>

            <NavButton />
            <Popup />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(NavbarSingleBlogPost);
