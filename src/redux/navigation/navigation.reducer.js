import { NavigationActionTypes } from "./navigation.types";

const initialState = {
    show: false,
    reload: false,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NavigationActionTypes.TOGGLE_NAVIGATION_MENU:
            return {
                ...state,
                show: !state.show,
            };
        case NavigationActionTypes.REMOVE_POPUP:
            return {
                ...state,
                show: false,
            };

        default:
            return state;
    }
};

export default navigationReducer;
