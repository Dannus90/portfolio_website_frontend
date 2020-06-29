import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignoutButton.styles.scss";
import { connect } from "react-redux";
import { signOut } from "../../redux/auth/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { signOutTransition } from "../../Utilities/Transitions/Transitions";

const SignoutButton = (props) => {
    const [showSignOut, setShowSignOut] = useState(false);
    return (
        <div className="signout-wrapper">
            <div className="signout-button-container">
                <div
                    className="signout-button"
                    onClick={() => setShowSignOut(!showSignOut)}
                >
                    <div className="signout-button-user-avatar">
                        <FontAwesomeIcon
                            icon="user"
                            className="signout-button-user-avatar-icon"
                        />
                    </div>{" "}
                    <div className="user-text">{props.user}</div>
                    <FontAwesomeIcon icon="caret-down" />
                </div>
            </div>
            {showSignOut && (
                <motion.div
                    onClick={() => props.signOutHandler()}
                    className="dropdown-signout"
                    exit="out"
                    animate="in"
                    initial="out"
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    whileHover={{ translateY: -1 }}
                    variants={signOutTransition}
                >
                    <FontAwesomeIcon
                        icon="sign-out-alt"
                        className="signout-icon"
                    />{" "}
                    <p className="signout-paragraph">Sign out</p>
                </motion.div>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOutHandler: () => dispatch(signOut()),
    };
};

export default connect(null, mapDispatchToProps)(SignoutButton);
