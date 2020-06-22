import { AuthActionTypes } from "./auth.types";

export const signIn = (userName) => ({
    type: AuthActionTypes.SIGNED_IN,
    payload: userName,
});

export const signOut = () => ({
    type: AuthActionTypes.SIGNED_OUT,
});
