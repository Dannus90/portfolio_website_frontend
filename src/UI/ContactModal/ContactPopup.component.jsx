import React from "react";
import "./ContactPopup.styles.scss";

const ContactPopupFail = ({ message }) => {
    return (
        <div className="modal-wrapper-fail">
            <p>{message}</p>
        </div>
    );
};

export default ContactPopupFail;
