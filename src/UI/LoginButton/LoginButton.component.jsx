import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginButton.styles.scss";
import { connect } from "react-redux";
import { removePopup } from "../../redux/navigation/navigation.actions";

const LoginButton = (props) => {
    const history = useHistory();

    return (
        <div
            className="login-button-container"
            style={
                history.location.pathname === "/register"
                    ? { top: "3rem" }
                    : null
            }
        >
            <Link
                to="/login"
                className="login-button"
                onClick={() => props.removePopup()}
            >
                Login
            </Link>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        removePopup: () => dispatch(removePopup()),
    };
};

export default connect(null, mapDispatchToProps)(LoginButton);
