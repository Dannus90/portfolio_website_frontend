import { NavigationActionTypes } from "./navigation.types";

export const toggleNavigation = () => ({
    type: NavigationActionTypes.TOGGLE_NAVIGATION_MENU,
});

export const removePopup = () => ({
    type: NavigationActionTypes.REMOVE_POPUP,
});
