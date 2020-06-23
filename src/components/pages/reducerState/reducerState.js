import React from "react";
import { connect } from "react-redux";

const ReducerState = (props) => {
    return (
        <div>
            <h1>ReducerState</h1>
            {props.isSignedIn}
            {props.loggedInMessage}
            {props.token}
            {props.expiresAt}
            {props.userInfo}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authReducer.isSignedIn,
        loggedInMessage: state.authReducer.loggedInMessage,
        token: state.authReducer.token,
        expiresAt: state.authReducer.expiresAt,
        userInfo: state.authReducer.userInfo,
    };
};

export default connect(mapStateToProps)(ReducerState);
