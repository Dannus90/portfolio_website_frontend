import React, { useState } from "react";
import "./LoginForm.styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginValidation } from "../../../Utilities/validation/loginValidation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (loginValidation(email)) {
            let dataToSubmit = {
                email: email,
                password: password,
            };

            axios
                .post("http://localhost:5000/api/user/login", dataToSubmit)
                .then((res) => {
                    if (res.status === 200) {
                        setLoginMessage("You have successfully logged in!");
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 3000);
                    } else {
                        const message =
                            res.data.charAt(0).toUpperCase() +
                            res.data.slice(1);
                        setLoginMessage(message);
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 3000);
                    }
                })
                .catch((err) => {
                    let errorMessage = err.request.responseText.replace(
                        /['"]+/g,
                        ""
                    );
                    let uppercaseFirstLetterMessage =
                        errorMessage.charAt(0).toUpperCase() +
                        errorMessage.slice(1);

                    setLoginMessage(uppercaseFirstLetterMessage);
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000);
                });
        } else {
            setLoginMessage("Please enter a valid email!");
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };
    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={submitHandler} className="login-form">
                <label htmlFor="email">Email Address</label>
                <input
                    className="login-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => emailHandler(e)}
                />
                <label htmlFor="password">Password</label>
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => passwordHandler(e)}
                />
                <input
                    type="submit"
                    value="Login"
                    className="login-submit-button"
                />
            </form>
            <p>Forgot password?</p>
            <Link to="/register" className="register-link">
                No account yet?
            </Link>
            {showPopup ? (
                <div className="popup-message">
                    <p className="popup-message-paragraph">{loginMessage}</p>
                </div>
            ) : null}
        </div>
    );
};

export default LoginForm;
