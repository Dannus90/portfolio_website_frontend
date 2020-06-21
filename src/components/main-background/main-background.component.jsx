import React from "react";
import "./main-background.style.scss";
import TextScroll from "../text-scroll/text-scroll.component";
import MainButton from "../../UI/MainButton/MainButton.component";

import { connect } from "react-redux";

const MainBackground = (props) => {
    return (
        <div className="main-background-content">
            <div
                className="main-background-content__overlay"
                style={props.show ? { clipPath: "none" } : null}
            />

            <TextScroll />
            <MainButton />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(MainBackground);
