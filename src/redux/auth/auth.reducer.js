import { AuthActionTypes } from "./auth.types";

const initialState = {
    isAuthenticated: false,
    isAdmin: localStorage.getItem("isAdmin") || false,
    token: localStorage.getItem("token") || null,
    expiresAt: localStorage.getItem("expiresAt") || null,
    loggedInMessage: localStorage.getItem("loggedInMessage") || "",
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
};

const authReducer = (state = initialState, action) => {
    state.isAuthenticated = new Date().getTime() / 1000 < state.expiresAt;
    switch (action.type) {
        case AuthActionTypes.SIGNED_IN:
            return {
                ...state,
                isAdmin: action.payload.isAdmin,
                token: action.payload.token,
                expiresAt: action.payload.expiresAt,
                loggedInMessage: action.payload.loggedInMessage,
                userInfo: action.payload.userInfo,
                isAuthenticated: action.payload.isAuthenticated,
            };
        case AuthActionTypes.SIGNED_OUT:
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("expiresAt");
            localStorage.removeItem("isSignedIn");
            localStorage.removeItem("loggedInMessage");
            return {
                ...state,
                isAuthenticated: false,
                isAdmin: false,
                token: null,
                expiresAt: null,
                loggedInMessage: "",
                userInfo: {},
            };
        default:
            return state;
    }
};

export default authReducer;
