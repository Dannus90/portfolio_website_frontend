import React, { useState } from "react";
import { registerValidation } from "../../../Utilities/validation/registerValidation";
import "./RegisterForm.styles.scss";
import axios from "axios";

const RegisterForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        if (registerValidation(fullName, email, password, confirmPassword)) {
            let dataToSubmit = {
                fullName: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            };

            axios
                .post("http://localhost:5000/api/user/register", dataToSubmit)
                .then((res) => {})
                .catch((err) => {
                    console.log(`Message not sent! Error! ${err}`);
                });
        } else {
            console.log("Validation failed!");
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
                <input
                    type="submit"
                    value="Register"
                    className="register-submit-button"
                />
            </form>
        </div>
    );
};

export default RegisterForm;
