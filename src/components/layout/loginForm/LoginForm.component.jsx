import React, { useState } from "react";
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
    const [loginMessage, setLoginMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (loginValidation(email)) {
            let dataToSubmit = {
                email: email,
                password: password,
            };

            axios
                .post("http://localhost:5000/api/user/login", dataToSubmit)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.userName);
                        setLoginMessage("You have successfully logged in!");
                        setIsLoading(false);
                        props.signInHandler(
                            `Signed in as ${res.data.userName}`
                        );
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                            history.push("/");
                        }, 2000);
                    } else {
                        const message =
                            res.data.charAt(0).toUpperCase() +
                            res.data.slice(1);
                        setLoginMessage(message);
                        setIsLoading(false);
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 4000);
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
                    setIsLoading(false);
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 4000);
                });
        } else {
            setLoginMessage("Please enter a valid email!");
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
                {showPopup ? (
                    <div className="popup-message">
                        <p className="popup-message-paragraph">
                            {loginMessage}
                        </p>
                    </div>
                ) : null}
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
                No account yet?
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
