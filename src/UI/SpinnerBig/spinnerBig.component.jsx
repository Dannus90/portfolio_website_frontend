import React from "react";
import "./spinnerBig.styles.scss";

const Spinner = () => {
    return (
        <div className="sk-chase-big">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
    );
};

export default Spinner;
