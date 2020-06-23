import { AuthActionTypes } from "./auth.types";

export const signIn = (data) => ({
    type: AuthActionTypes.SIGNED_IN,
    payload: data,
});

export const signOut = () => ({
    type: AuthActionTypes.SIGNED_OUT,
});
