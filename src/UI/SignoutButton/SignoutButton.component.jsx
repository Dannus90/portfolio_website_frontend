import React from "react";
import { Link } from "react-router-dom";
import "./SignoutButton.styles.scss";
import { connect } from "react-redux";
import { signOut } from "../../redux/auth/auth.actions";

const SignoutButton = (props) => {
    return (
        <div className="signout-button-container">
            <Link
                to="/"
                className="signout-button"
                onClick={() => props.signOutHandler()}
            >
                Signout
            </Link>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOutHandler: () => dispatch(signOut()),
    };
};

export default connect(null, mapDispatchToProps)(SignoutButton);
