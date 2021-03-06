import React, { useState, useEffect, useRef } from "react";
import "./slider.styles.scss";
import data from "./data.js/slider-data/data";
import Card from "../../../UI/Card/card.component";

const Slider = () => {
    const properties = data.properties;
    const [property, setProperty] = useState(data.properties[2]);
    const [isRunning, setIsRunning] = useState(true);

    // //Trying to solve sliding cards
    // useEffect(() => {
    //     if (property.index === data.properties.length - 2) {
    //         data.properties.push(data.properties[0]);
    //         data.properties.shift();
    //         data.properties.forEach((property) => {
    //             property.index = property.index - 1;
    //         });
    //         data.properties[data.properties.length - 1].index =
    //             data.properties.length;
    //     }
    // }, [property.index]);

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(
        () => {
            let newIndex = property.index + 1;

            if (newIndex >= data.properties.length) {
                setProperty(data.properties[0]);
            } else {
                setProperty(data.properties[newIndex]);
            }
        },
        isRunning ? 6000 : null
    );

    const nextTestimonial = () => {
        setIsRunning(false);
        let newIndex = property.index + 1;

        if (newIndex >= data.properties.length) {
            newIndex = data.properties.length;
        } else {
            setProperty(data.properties[newIndex]);
        }
        setTimeout(() => {
            setIsRunning(true);
        }, 2000);
        return;
    };

    const prevTestimonial = () => {
        setIsRunning(false);
        let newIndex = property.index - 1;

        if (newIndex === 0) {
            setProperty(data.properties[0]);
        } else {
            setProperty(data.properties[newIndex]);
        }
        setTimeout(() => {
            setIsRunning(true);
        }, 2000);
        return;
    };

    return (
        <div className="slider-page-wrapper">
            <div className="slider-container">
                <section className="slider-header">
                    <button
                        className="btn btn-left"
                        onClick={() => prevTestimonial()}
                        disabled={property.index === 0}
                    >
                        <span>&larr;</span>
                    </button>
                    <h2>Technologies I have been working with</h2>

                    <button
                        className="btn btn-right"
                        onClick={() => nextTestimonial()}
                        disabled={property.index === data.properties.length - 1}
                    >
                        &rarr;
                    </button>
                </section>

                <div className={`cards-slider active-slide-${property.index}`}>
                    <div
                        className="cards-slider-wrapper"
                        style={{
                            transform: `translateX(-${
                                property.index * (100 / properties.length)
                            }%)`,
                        }}
                    >
                        {properties.map((prop) => (
                            <Card
                                key={prop._id}
                                property={prop}
                                className="sliding-cards"
                                activeProp={property.index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
