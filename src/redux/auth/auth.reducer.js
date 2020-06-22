import { AuthActionTypes } from "./auth.types";

const initialState = {
    isSignedIn: false,
    userName: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.SIGNED_IN:
            return {
                ...state,
                isSignedIn: true,
                userName: action.payload,
            };
        case AuthActionTypes.SIGNED_OUT:
            return {
                ...state,
                isSignedIn: false,
                userName: "",
            };
        default:
            return state;
    }
};

export default authReducer;
