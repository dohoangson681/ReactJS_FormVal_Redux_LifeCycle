import { combineReducers } from "redux";
import { createStore } from "redux";
import { QLSVReudcer } from "./QLSVReducer";
const RootReducer = combineReducers({
    QLSVReudcer
}) ; 
const store = createStore(RootReducer) ; 
export default store ; 