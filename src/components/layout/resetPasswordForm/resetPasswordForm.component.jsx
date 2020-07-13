import React, { useState, useEffect } from "react";
import { resetPasswordValidation } from "../../../Utilities/validation/resetPasswordValidation";
import "./resetPasswordForm.styles.scss";
import axios from "axios";
import SpinnerSmallDark from "../../../UI/SpinnerSmallDark/spinnerSmallDark.component";
import { useHistory, useParams } from "react-router-dom";

const ResetPasswordForm = (props) => {
    const [showPasswordRequired, setShowPasswordRequired] = useState("");
    const [password, setPassword] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // hooks from react-router-dom
    const history = useHistory();
    const { id } = useParams();
    // console.log(props.location);

    useEffect(() => {
        if (confirmPassword !== "") {
            setShowPasswordRequired(false);
        }

        if (password !== "") {
            setShowPasswordRequired(false);
        }
    }, [password]);

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === "") {
            setShowPasswordRequired(true);
            return;
        }

        setIsLoading(true);

        const { validated, msg } = resetPasswordValidation(
            password,
            confirmPassword
        );

        if (validated) {
            let dataToSubmit = {
                password: password,
                id: id,
            };

            axios
                .patch(
                    `${process.env.REACT_APP_API_URL}/api/user/reset`,
                    dataToSubmit
                )
                .then((res) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        history.push("/login");
                    }, 1000);
                })
                .catch((err) => {
                    setResetMessage(
                        JSON.parse(err.request.responseText).message ||
                            "Issue connecting to the server"
                    );
                    setShowPopup(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowPopup(false);
                        setResetMessage("");
                    }, 4000);
                });
        } else {
            setResetMessage(msg);
            setShowPopup(true);
            setIsLoading(false);
            setTimeout(() => {
                setShowPopup(false);
                setResetMessage("");
            }, 4000);
        }
    };

    return (
        <div className="reset-form-container">
            <h2>Choose a new Password</h2>
            {showPopup ? (
                <div className="popup-message">
                    <p className="popup-message-paragraph">{resetMessage}</p>
                </div>
            ) : null}
            <form onSubmit={submitHandler} className="reset-form">
                <div className="password-container">
                    <div className="single-password-input-container">
                        <label htmlFor="password">Password</label>
                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => passwordHandler(e)}
                        />
                        {showPasswordRequired && (
                            <span className="required-paragraph">
                                Password is required
                            </span>
                        )}
                    </div>

                    <div className="single-password-input-container">
                        <label htmlFor="Confirm password">
                            Confirm password
                        </label>
                        <input
                            className="login-input"
                            type="password"
                            name="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => confirmPasswordHandler(e)}
                        />
                        {showPasswordRequired && (
                            <span className="required-paragraph">
                                Confirm password is required
                            </span>
                        )}
                    </div>
                </div>
                <div className="password-rules-container">
                    <p className="password-rules-paragraph">
                        *Password must be atleast 8 character long and contain
                        one of each: one lowercase char, one uppercase char, one
                        numeric char and one special char.
                    </p>
                </div>

                {!isLoading ? (
                    <input
                        type="submit"
                        value="Reset Password"
                        className="reset-submit-button"
                    />
                ) : null}
                {isLoading ? (
                    <div className="reset-small-spinner">
                        <SpinnerSmallDark />
                    </div>
                ) : null}
            </form>
        </div>
    );
};

export default ResetPasswordForm;
