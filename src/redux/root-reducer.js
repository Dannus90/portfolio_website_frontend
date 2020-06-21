import { combineReducers } from "redux";
import navigationReducer from "./navigation/navigation.reducer";

const rootReducer = combineReducers({
    navigationReducer: navigationReducer,
});

export default rootReducer;
