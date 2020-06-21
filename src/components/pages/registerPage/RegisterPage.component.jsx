import React from "react";
import "./RegisterPage.style.scss";
import { connect } from "react-redux";
import Layout from "../../layout/layout/layout.component";

import RegisterForm from "../../layout/registerForm/RegisterForm.component";

const RegisterPage = (props) => {
    return (
        <Layout>
            <div className="main-background-content">
                <div
                    className="main-background-content__overlay"
                    style={props.show ? { clipPath: "none" } : null}
                />
                <RegisterForm />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(RegisterPage);
