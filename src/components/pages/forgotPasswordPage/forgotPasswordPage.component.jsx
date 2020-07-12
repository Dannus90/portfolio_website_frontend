import React from "react";
import "./forgotPasswordPage.component";
import { connect } from "react-redux";
import Layout from "../../layout/layout/layout.component";
import ForgotPasswordForm from "../../../components/layout/forgotPasswordForm/forgotPasswordForm.component";

const ForgotPasswordPage = (props) => {
    return (
        <Layout>
            <div className="main-background-content">
                <div
                    className="main-background-content__overlay"
                    style={props.show ? { clipPath: "none" } : null}
                />
                <ForgotPasswordForm />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(ForgotPasswordPage);
