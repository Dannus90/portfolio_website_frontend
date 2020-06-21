import React from "react";
import "./LoginPage.style.scss";
import { connect } from "react-redux";
import Layout from "../../layout/layout/layout.component";
import LoginForm from "../../layout/loginForm/LoginForm.component";

const LoginPage = (props) => {
    return (
        <Layout>
            <div className="main-background-content">
                <div
                    className="main-background-content__overlay"
                    style={props.show ? { clipPath: "none" } : null}
                />
                <LoginForm />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(LoginPage);
