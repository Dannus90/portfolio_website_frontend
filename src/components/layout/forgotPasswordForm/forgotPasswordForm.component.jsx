import React, { useState, useEffect } from "react";
import "./forgotPasswordForm.styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import SpinnerSmallDark from "../../../UI/SpinnerSmallDark/spinnerSmallDark.component";
import { emailValidation } from "../../../Utilities/validation/emailValidation";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailRequired, setShowEmailRequired] = useState(false);
    const [forgotErrorMessage, setForgotErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        if (email !== "") {
            setShowEmailRequired(false);
        }
    }, [email]);

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "") {
            setShowEmailRequired(true);
            return;
        }

        setIsLoading(true);
        if (emailValidation(email)) {
            let dataToSubmit = {
                email: email,
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/user/forgot`,
                    dataToSubmit
                )
                .then((res) => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                    setTimeout(() => {
                        setShowSuccessPopup(true);
                        setSuccessMessage(
                            "An email has been sent to you with a reset link."
                        );
                    }, 1000);

                    setTimeout(() => {
                        setShowSuccessPopup(false);
                        setSuccessMessage("");
                    }, 4000);
                })
                .catch((err) => {
                    let errorMessage = err.request.responseText.replace(
                        /['"]+/g,
                        ""
                    );
                    let uppercaseFirstLetterMessage =
                        errorMessage.charAt(0).toUpperCase() +
                        errorMessage.slice(1);

                    setForgotErrorMessage(
                        uppercaseFirstLetterMessage ||
                            "Issue connecting to the server"
                    );
                    setIsLoading(false);
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        setForgotErrorMessage("");
                    }, 4000);
                });
        } else {
            setForgotErrorMessage("Please enter a valid email");
            setIsLoading(false);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                setForgotErrorMessage("");
            }, 4000);
        }
    };

    return (
        <div className="forgot-password-form-container">
            <h2>Forgot Password?</h2>
            {showPopup ? (
                <div className="popup-message">
                    <p className="popup-message-paragraph">
                        {forgotErrorMessage}
                    </p>
                </div>
            ) : null}
            {showSuccessPopup ? (
                <div className="success-popup-message">
                    <p className="success-popup-message-paragraph">
                        {successMessage}
                    </p>
                </div>
            ) : null}
            <form onSubmit={submitHandler} className="forgot-password-form">
                <label htmlFor="email">Email Address</label>
                <input
                    className="forgot-password-input"
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
                        value="Send reset link"
                        className="forgot-password-button"
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

export default ForgotPasswordForm;
