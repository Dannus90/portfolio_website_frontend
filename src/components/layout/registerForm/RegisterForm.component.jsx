import React, { useState, useEffect } from "react";
import { registerValidation } from "../../../Utilities/validation/registerValidation";
import "./RegisterForm.styles.scss";
import axios from "axios";
import SpinnerSmallDark from "../../../UI/SpinnerSmallDark/spinnerSmallDark.component";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../../redux/auth/auth.actions";

const RegisterForm = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showFullnameRequired, setShowFullnameRequired] = useState(false);
    const [showEmailRequired, setShowEmailRequired] = useState(false);
    const [showPasswordRequired, setShowPasswordRequired] = useState(false);

    useEffect(() => {
        if (email !== "") {
            setShowEmailRequired(false);
        }

        if (password !== "") {
            setShowPasswordRequired(false);
        }

        if (fullName !== "") {
            setShowFullnameRequired(false);
        }
    }, [email, password, fullName]);

    const history = useHistory();

    const fullNameHandler = (e) => {
        setFullName(e.target.value);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (email === "" && password === "" && fullName === "") {
            setShowEmailRequired(true);
            setShowPasswordRequired(true);
            setShowFullnameRequired(true);
            return;
        } else if (email === "" && password === "") {
            setShowEmailRequired(true);
            setShowPasswordRequired(true);
            return;
        } else if (email === "" && fullName === "") {
            setShowEmailRequired(true);
            setShowFullnameRequired(true);
            return;
        } else if (fullName === "" && password === "") {
            setShowPasswordRequired(true);
            setShowFullnameRequired(true);
        } else if (email === "") {
            setShowEmailRequired(true);
            return;
        } else if (password === "") {
            setShowPasswordRequired(true);
            return;
        } else if (fullName === "") {
            setShowFullnameRequired(true);
        }

        setIsLoading(true);

        const { validated, msg } = registerValidation(
            fullName,
            email,
            password,
            confirmPassword
        );

        if (validated) {
            let dataToSubmit = {
                fullName: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/user/register`,
                    dataToSubmit
                )
                .then((res) => {
                    if (res.status === 400) {
                        setRegisterMessage(res.data.message);
                        setShowPopup(true);
                        setIsLoading(false);
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 4000);
                        return;
                    }

                    props.signInHandler({
                        isAdmin: res.data.userInfo.isAdmin,
                        loggedInMessage: res.data.userInfo.fullName,
                        token: res.data.token,
                        expiresAt: res.data.expiresAt,
                        userInfo: res.data.userInfo,
                        isAuthenticated:
                            new Date().getTime() / 1000 < res.data.expiresAt,
                    });

                    localStorage.setItem("isAdmin", res.data.userInfo.isAdmin);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.data.userInfo)
                    );
                    localStorage.setItem("expiresAt", res.data.expiresAt);

                    localStorage.setItem(
                        "loggedInMessage",
                        `${res.data.userInfo.fullName}`
                    );
                    setTimeout(() => {
                        setIsLoading(false);
                        history.push("/");
                    }, 1000);
                })
                .catch((err) => {
                    setRegisterMessage(err.request.responseText);
                    setShowPopup(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 4000);
                });
        } else {
            setRegisterMessage(msg);
            setShowPopup(true);
            setIsLoading(false);
            setTimeout(() => {
                setShowPopup(false);
            }, 4000);
        }
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            {showPopup ? (
                <div className="popup-message">
                    <p className="popup-message-paragraph">{registerMessage}</p>
                </div>
            ) : null}
            <form onSubmit={submitHandler} className="register-form">
                <label htmlFor="full name">Full Name</label>
                <input
                    className="login-input"
                    type="text"
                    name="full name"
                    value={fullName}
                    onChange={(e) => fullNameHandler(e)}
                />
                {showFullnameRequired && (
                    <span className="required-paragraph">
                        Fullname is required
                    </span>
                )}
                <label htmlFor="email">Email Address</label>
                <input
                    className="login-input"
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
                        value="Register"
                        className="register-submit-button"
                    />
                ) : null}
                {isLoading ? (
                    <div className="register-small-spinner">
                        <SpinnerSmallDark />
                    </div>
                ) : null}
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInHandler: (userName) => dispatch(signIn(userName)),
    };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
