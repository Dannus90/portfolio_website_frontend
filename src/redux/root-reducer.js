import { combineReducers } from "redux";
import navigationReducer from "./navigation/navigation.reducer";
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
    navigationReducer: navigationReducer,
    authReducer: authReducer,
});

export default rootReducer;
