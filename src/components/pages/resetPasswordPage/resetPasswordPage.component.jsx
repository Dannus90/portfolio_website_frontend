import React from "react";
import "./resetPasswordPage.styles.scss";
import { connect } from "react-redux";
import Layout from "../../layout/layout/layout.component";
import ResetPasswordForm from "../../../components/layout/resetPasswordForm/resetPasswordForm.component";

const ForgotPasswordPage = (props) => {
    return (
        <Layout>
            <div className="main-background-content">
                <div
                    className="main-background-content__overlay"
                    style={props.show ? { clipPath: "none" } : null}
                />
                <ResetPasswordForm />
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
