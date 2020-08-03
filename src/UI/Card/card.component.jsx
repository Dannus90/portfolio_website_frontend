import React from "react";
import "./card.styles.scss";

const Card = ({ property, activeProp }) => {
    console.log(activeProp);
    const { index, name, text, picture } = property;
    return (
        <div
            id={`card-${index}`}
            className="card"
            style={{
                opacity:
                    index <= activeProp - 2 || index >= activeProp + 2 ? 0 : "",
            }}
        >
            <div className="card__img-container">
                <img
                    src={picture}
                    alt={name}
                    style={
                        name === "CSS" || name === "REACT"
                            ? { objectFit: "cover" }
                            : null
                    }
                />
                <span className="card__details-name">{name}</span>
            </div>
            <div className="card__details">
                <p className="card__details-text">{text}</p>
            </div>
        </div>
    );
};

export default Card;
