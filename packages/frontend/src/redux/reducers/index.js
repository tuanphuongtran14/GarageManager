import { combineReducers } from "redux";
import authorization from "./authorization";

const appReducer = combineReducers({
    authorization
});

export default appReducer;