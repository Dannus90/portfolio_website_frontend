import React from "react";
import "./authPage.styles.scss";
import { connect } from "react-redux";
import Layout from "../../layout/layout/layout.component";
import ForgotPasswordForm from "../../../components/layout/forgotPasswordForm/forgotPasswordForm.component";
import LoginForm from "../../../components/layout/loginForm/LoginForm.component";
import RegisterForm from "../../../components/layout/registerForm/RegisterForm.component";
import { useHistory } from "react-router-dom";

const AuthPage = (props) => {
    console.log(useHistory().location.pathname);
    let history = useHistory();
    let content;

    if (history.location.pathname === "/forgot") {
        content = <ForgotPasswordForm />;
    } else if (history.location.pathname === "/login") {
        content = <LoginForm />;
    } else if (history.location.pathname === "/register") {
        content = <RegisterForm />;
    }

    return (
        <Layout history={history.location.pathname}>
            <div className="main-background-content">
                <div
                    className="main-background-content__overlay"
                    style={props.show ? { clipPath: "none" } : null}
                />
                {content}
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(AuthPage);
