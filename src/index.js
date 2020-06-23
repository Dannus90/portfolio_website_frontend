import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ScrollToTop from "./Utilities/scrollToTop";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
    faCheckSquare,
    faUser,
    faPhone,
    faLocationArrow,
    faSearchLocation,
    faMailBulk,
    faCheck,
    faTimes,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faChevronRight,
    faChevronLeft,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    fab,
    faCheckSquare,
    faUser,
    faPhone,
    faLocationArrow,
    faSearchLocation,
    faMailBulk,
    faCheck,
    faTimes,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faChevronRight,
    faChevronLeft,
    faChevronDown
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
