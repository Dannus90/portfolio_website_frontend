import React from "react";
import { connect } from "react-redux";
import { toggleNavigation } from "../../redux/navigation/navigation.actions";
import "./NavButton.style.scss";

const Button = (props) => {
    return (
        <div className="navbar-container-button-container">
            <input
                type="checkbox"
                className="navbar-container-checkbox"
                id="nav-toggle"
                onChange={() => props.toggleNavigationMenu()}
            />
            <label htmlFor="nav-toggle" className="navbar-container-button">
                <span className="navbar-container-button--icon"></span>
            </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Button);
