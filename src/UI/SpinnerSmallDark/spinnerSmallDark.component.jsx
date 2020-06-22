import React from "react";
import "./spinnerSmallDark.styles.scss";

const Spinner = () => {
    return (
        <div className="sk-chase-small-dark">
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
