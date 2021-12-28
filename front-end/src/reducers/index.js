import UserReducer from "./UserReducer";
import ObjetsReducer from "./ObjetsReducer";
import {combineReducers} from "redux";

export default combineReducers({
    UserReducer,
    ObjetsReducer
});
