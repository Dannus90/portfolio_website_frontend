import React, { useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contact.styles.scss";
import { checkValidity } from "../../../Utilities/validation/validationRules";
import SpinnerSmallLight from "../../../UI/SpinnerSmallLight/spinnerSmallLight.component";
import ContactPopup from "../../../UI/ContactModal/ContactPopup.component";
import axios from "axios";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    showModal: false,
    isValid: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FIRSTNAME":
            return { ...state, firstName: action.payload };
        case "LASTNAME":
            return { ...state, lastName: action.payload };
        case "EMAIL":
            return { ...state, email: action.payload };
        case "PHONE":
            return { ...state, phone: action.payload };
        case "MESSAGE":
            return { ...state, message: action.payload };
        case "RESET":
            return {
                ...state,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
            };
        default:
            return state;
    }
};

const Contact = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [validationState, setValidationState] = useState({
        firstNameValidated: false,
        lastNameValidated: false,
        emailValidated: false,
        phoneValidated: true,
        messageValidated: false,
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    //Checking validity
    const inputValidityCheck = (value, type) => {
        if (type === "firstName") {
            let rules = {
                required: true,
            };
            dispatch({
                type: "FIRSTNAME",
                payload: value,
            });

            if (checkValidity(value, rules)) {
                setValidationState({
                    ...validationState,
                    firstNameValidated: true,
                });
            } else {
                setValidationState({
                    ...validationState,
                    firstNameValidated: false,
                });
            }
        }

        if (type === "lastName") {
            let rules = {
                required: true,
            };

            dispatch({
                type: "LASTNAME",
                payload: value,
            });

            if (checkValidity(value, rules)) {
                setValidationState({
                    ...validationState,
                    lastNameValidated: true,
                });
            } else {
                setValidationState({
                    ...validationState,
                    lastNameValidated: false,
                });
            }
        }

        if (type === "email") {
            let rules = {
                required: true,
                isEmail: true,
            };

            dispatch({
                type: "EMAIL",
                payload: value,
            });

            if (checkValidity(value, rules)) {
                setValidationState({
                    ...validationState,
                    emailValidated: true,
                });
            } else {
                setValidationState({
                    ...validationState,
                    emailValidated: false,
                });
            }
        }

        if (type === "phone") {
            dispatch({
                type: "PHONE",
                payload: value,
            });
        }

        if (type === "message") {
            let rules = {
                required: true,
                minLength: 50,
                maxLength: 200,
            };

            dispatch({
                type: "MESSAGE",
                payload: value,
            });

            if (checkValidity(value, rules)) {
                setValidationState({
                    ...validationState,
                    messageValidated: true,
                });
            } else {
                setValidationState({
                    ...validationState,
                    messageValidated: false,
                });
            }
        }
    };

    //Handling submit

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (
            validationState.firstNameValidated === true &&
            validationState.lastNameValidated === true &&
            validationState.emailValidated === true &&
            validationState.messageValidated === true
        ) {
            let dataToSubmit = {
                firstname: state.firstName,
                lastname: state.lastName,
                email: state.email,
                phone: state.phone,
                message: state.message,
            };

            axios
                .post("http://localhost:5000/api/sendMail", dataToSubmit)
                .then((res) => {
                    setIsLoading(false);
                    setShowModal(true);
                    setModalMessage("Message has been sent successfully!");
                    setTimeout(() => {
                        setShowModal(false);
                    }, 3000);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(`Message not sent! Error! ${err}`);

                    setShowModal(true);
                    setModalMessage("Server Error! Message has not been sent!");
                    setTimeout(() => {
                        setShowModal(false);
                    }, 5000);
                });

            resetForm();
        } else {
            setIsLoading(false);
            setShowModal(true);

            if (
                validationState.firstNameValidated === true &&
                validationState.lastNameValidated === true &&
                validationState.emailValidated === true &&
                validationState.messageValidated === false
            ) {
                setModalMessage(
                    "Please enter a message between 50-200 characters"
                );
            } else {
                setModalMessage("Please fill out the form correctly");
            }
            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        }
    };

    // Reseting form
    const resetForm = () => {
        setValidationState({
            firstNameValidated: false,
            lastNameValidated: false,
            emailValidated: false,
            phoneValidated: true,
            messageValidated: false,
        });

        return dispatch({ type: "RESET" });
    };

    return (
        <div className="form-section">
            <h2 id="contact-me">Contact Me</h2>
            <div className="form-container">
                <div className="form-side">
                    <div className="contact-info-container">
                        <FontAwesomeIcon icon="location-arrow" />
                        <p>Skällaredsvägen 68, Onsala</p>
                    </div>
                    <div className="contact-info-container">
                        <FontAwesomeIcon icon="phone" />
                        <p>073-324 98 26</p>
                    </div>
                    <div className="contact-info-container">
                        <FontAwesomeIcon icon="mail-bulk" />
                        <p>persson.daniel.1990@gmail.com</p>
                    </div>
                </div>

                <form id="contact-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="required-info">
                        <p>* Denotes required field</p>
                    </div>
                    {showModal ? <ContactPopup message={modalMessage} /> : null}

                    <div className="form-container-content">
                        <label htmlFor="firstName">
                            Firstname<span className="label-span">*</span>
                        </label>

                        <div className="input-container">
                            <input
                                placeholder="Your firstname..."
                                type="text"
                                name="firstName"
                                value={state.firstName}
                                className="form-input"
                                onChange={(e) => {
                                    inputValidityCheck(
                                        e.target.value,
                                        "firstName"
                                    );
                                }}
                                style={
                                    state.firstName === ""
                                        ? { borderBottom: "none" }
                                        : validationState.firstNameValidated
                                        ? { borderBottom: "2px solid green" }
                                        : null
                                }
                            />
                        </div>
                    </div>

                    <div className="form-container-content">
                        <label htmlFor="lastName">
                            Lastname<span className="label-span">*</span>
                        </label>

                        <div className="input-container">
                            <input
                                placeholder="Your lastname..."
                                type="text"
                                name="lastName"
                                value={state.lastName}
                                className="form-input"
                                onChange={(e) =>
                                    inputValidityCheck(
                                        e.target.value,
                                        "lastName"
                                    )
                                }
                                style={
                                    state.lastName === ""
                                        ? { borderBottom: "none" }
                                        : validationState.lastNameValidated
                                        ? { borderBottom: "2px solid green" }
                                        : null
                                }
                            />
                        </div>
                    </div>
                    <div className="form-container-content">
                        <label htmlFor="email">
                            Email<span className="label-span">*</span>
                        </label>

                        <div className="input-container">
                            <input
                                placeholder="Your email..."
                                type="email"
                                name="email"
                                value={state.email}
                                className="form-input"
                                onChange={(e) =>
                                    inputValidityCheck(e.target.value, "email")
                                }
                                style={
                                    state.email === ""
                                        ? { borderBottom: "none" }
                                        : validationState.emailValidated
                                        ? { borderBottom: "2px solid green" }
                                        : { borderBottom: "2px solid red" }
                                }
                            />
                        </div>
                    </div>
                    <div className="form-container-content">
                        <label htmlFor="phone">Phone</label>
                        <div className="input-container">
                            <input
                                placeholder="Your phone number..."
                                type="phone"
                                name="phone"
                                value={state.phone}
                                className="form-input"
                                onChange={(e) =>
                                    inputValidityCheck(e.target.value, "phone")
                                }
                            />
                        </div>
                    </div>
                    <div className="form-container-content">
                        <label htmlFor="message">
                            Message<span className="label-span">*</span>
                        </label>
                        <div className="input-container">
                            <textarea
                                placeholder="Leave a message between 50-200 characters"
                                type="textarea"
                                name="message"
                                value={state.message}
                                className="message-input"
                                onChange={(e) =>
                                    inputValidityCheck(
                                        e.target.value,
                                        "message"
                                    )
                                }
                                style={
                                    state.message === ""
                                        ? { borderBottom: "none" }
                                        : validationState.messageValidated
                                        ? { borderBottom: "2px solid green" }
                                        : { borderBottom: "2px solid red" }
                                }
                            />
                        </div>
                    </div>
                    {!isLoading ? (
                        <input
                            type="submit"
                            value="submit"
                            className="form-submit-button"
                        />
                    ) : null}
                    {isLoading ? (
                        <div className="show-spinner">
                            <SpinnerSmallLight />
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    );
};

export default Contact;
