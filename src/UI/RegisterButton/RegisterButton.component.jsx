import React from "react";
import { Link } from "react-router-dom";
import "./RegisterButton.styles.scss";
import { connect } from "react-redux";
import { removePopup } from "../../redux/navigation/navigation.actions";

const RegisterButton = (props) => {
    return (
        <div className="register-button-container">
            <Link
                to="/register"
                className="register-button"
                onClick={() => props.removePopup()}
            >
                Register
            </Link>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        removePopup: () => dispatch(removePopup()),
    };
};

export default connect(null, mapDispatchToProps)(RegisterButton);
