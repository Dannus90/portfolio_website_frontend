import React, { useState, useEffect } from "react";
import "./LoginForm.styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginValidation } from "../../../Utilities/validation/loginValidation";
import SpinnerSmallDark from "../../../UI/SpinnerSmallDark/spinnerSmallDark.component";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../../redux/auth/auth.actions";

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailRequired, setShowEmailRequired] = useState(false);
    const [showPasswordRequired, setShowPasswordRequired] = useState(false);

    useEffect(() => {
        if (email !== "") {
            setShowEmailRequired(false);
        }

        if (password !== "") {
            setShowPasswordRequired(false);
        }
    }, [email, password]);

    const history = useHistory();

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "" && password === "") {
            setShowEmailRequired(true);
            setShowPasswordRequired(true);
            return;
        } else if (email === "") {
            setShowEmailRequired(true);
            return;
        } else if (password === "") {
            setShowPasswordRequired(true);
            return;
        }

        setIsLoading(true);
        if (loginValidation(email)) {
            let dataToSubmit = {
                email: email,
                password: password,
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/user/login`,
                    dataToSubmit
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        props.signInHandler({
                            isAdmin: res.data.userInfo.isAdmin,
                            loggedInMessage: res.data.userInfo.fullName,
                            token: res.data.token,
                            expiresAt: res.data.expiresAt,
                            userInfo: res.data.userInfo,
                            isAuthenticated:
                                new Date().getTime() / 1000 <
                                res.data.expiresAt,
                        });

                        localStorage.setItem(
                            "isAdmin",
                            res.data.userInfo.isAdmin
                        );
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
                    } else {
                        const message =
                            res.data.charAt(0).toUpperCase() +
                            res.data.slice(1);
                        setLoginErrorMessage(message);
                        setIsLoading(false);
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 4000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    let errorMessage = err.request.responseText.replace(
                        /['"]+/g,
                        ""
                    );
                    let uppercaseFirstLetterMessage =
                        errorMessage.charAt(0).toUpperCase() +
                        errorMessage.slice(1);

                    setLoginErrorMessage(uppercaseFirstLetterMessage);
                    setIsLoading(false);
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 4000);
                });
        } else {
            setLoginErrorMessage("Please enter a valid email!");
            setIsLoading(false);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 4000);
        }
    };
    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {showPopup ? (
                <div className="popup-message">
                    <p className="popup-message-paragraph">
                        {loginErrorMessage}
                    </p>
                </div>
            ) : null}
            <form onSubmit={submitHandler} className="login-form">
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

                {!isLoading ? (
                    <input
                        type="submit"
                        value="Login"
                        className="login-submit-button"
                    />
                ) : null}
                {isLoading ? (
                    <div className="login-small-spinner">
                        <SpinnerSmallDark />
                    </div>
                ) : null}
            </form>
            <p>Forgot password?</p>
            <Link to="/register" className="register-link">
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

export default connect(null, mapDispatchToProps)(LoginForm);
