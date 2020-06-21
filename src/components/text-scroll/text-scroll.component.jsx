import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import "./text-scroll.style.scss";

const TextScroll = (props) => {
    useEffect(() => {
        init();
    }, []);

    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = "";
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            // Current index of word
            const current = this.wordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];

            // Check if deleting
            if (this.isDeleting) {
                // Remove char
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add char
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Insert txt into element
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            // Initial Type Speed
            let typeSpeed = 100;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            // If word is complete
            if (!this.isDeleting && this.txt === fullTxt) {
                // Make pause at end
                typeSpeed = this.wait;
                // Set delete to true
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === "") {
                this.isDeleting = false;
                // Move to next word
                this.wordIndex++;
                // Pause before start typing
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Init App
    const init = useCallback(() => {
        const txtElement = document.querySelector(".txt-type");
        const words = JSON.parse(txtElement.getAttribute("data-words"));
        const wait = txtElement.getAttribute("data-wait");
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }, []);

    return (
        <div
            className="dynamic-text"
            style={props.show ? { animation: "fadeaway 0.3s forwards" } : null}
        >
            <h1>
                I am Daniel a swedish
                <span
                    className="txt-type span-color"
                    data-wait="3000"
                    data-words='[" Web Developer", " Web Designer"]'
                ></span>
            </h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        show: state.navigationReducer.show,
    };
};

export default connect(mapStateToProps)(TextScroll);
