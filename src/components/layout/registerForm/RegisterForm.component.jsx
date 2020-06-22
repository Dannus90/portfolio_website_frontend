import React, { useState } from "react";
import { registerValidation } from "../../../Utilities/validation/registerValidation";
import "./RegisterForm.styles.scss";
import axios from "axios";
import SpinnerSmallDark from "../../../UI/SpinnerSmallDark/spinnerSmallDark.component";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                .post("http://localhost:5000/api/user/register", dataToSubmit)
                .then((res) => {
                    setRegisterMessage(res.data.message);
                    setShowPopup(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowPopup(false);
                        history.push("/login");
                    }, 2000);
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
            <form onSubmit={submitHandler} className="register-form">
                <label htmlFor="full name">Full Name</label>
                <input
                    className="login-input"
                    type="text"
                    name="full name"
                    value={fullName}
                    onChange={(e) => fullNameHandler(e)}
                />
                <label htmlFor="email">Email Address</label>
                <input
                    className="login-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => emailHandler(e)}
                />
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
                    </div>
                </div>
                <div className="password-rules-container">
                    <p className="password-rules-paragraph">
                        *Password must be atleast 8 character long and contain
                        one of each: one lowercase char, one uppercase char, one
                        numeric char and one special char.
                    </p>
                </div>
                {showPopup ? (
                    <div className="popup-message">
                        <p className="popup-message-paragraph">
                            {registerMessage}
                        </p>
                    </div>
                ) : null}
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

export default RegisterForm;
