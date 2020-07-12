import React, { useState, useEffect } from "react";
import "./forgotPasswordForm.styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import SpinnerSmallDark from "../../../UI/SpinnerSmallDark/spinnerSmallDark.component";
import { connect } from "react-redux";
import { signIn } from "../../../redux/auth/auth.actions";

const ForgotPasswordForm = (props) => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailRequired, setShowEmailRequired] = useState(false);

    const emailHandler = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    const submitHandler = () => {
        console.log("Got here");
    };

    return (
        <div className="reset-password-form-container">
            <h2>Reset Password</h2>
            <form onSubmit={submitHandler} className="reset-password-form">
                <label htmlFor="email">Email Address</label>
                <input
                    className="reset-password-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => emailHandler(e)}
                />
                {showEmailRequired && (
                    <span className="required-paragraph">
                        Email is required
                    </span>
                )}

                {!isLoading ? (
                    <input
                        type="submit"
                        value="Reset Password"
                        className="reset-password-button"
                    />
                ) : null}
                {isLoading ? (
                    <div className="login-small-spinner">
                        <SpinnerSmallDark />
                    </div>
                ) : null}
            </form>
            <Link to="/login">
                <p>Back to login</p>
            </Link>
            <Link to="/register">
                <p>No account yet?</p>
            </Link>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInHandler: (userName) => dispatch(signIn(userName)),
    };
};

export default connect(null, mapDispatchToProps)(ForgotPasswordForm);
