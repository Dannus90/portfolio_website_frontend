import React, { Fragment } from "react";
import "./MainButton.styles.scss";
import { connect } from "react-redux";

const MainButton = (props) => {
    return props.show ? null : (
        <Fragment>
            <a href="#about-me-section-1">
                <div className="buttonwrapper">
                    <div className="buttonwrapper__btn">
                        <p>About Me</p>
                    </div>
                </div>
            </a>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(MainButton);
