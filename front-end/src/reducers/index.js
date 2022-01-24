import UserReducer from "./UserReducer";
import ObjetsReducer from "./ObjetsReducer";
import MesRdvReducer from "./MesRdvReducer";
import {combineReducers} from "redux";

export default combineReducers({
    UserReducer,
    ObjetsReducer,
    MesRdvReducer
});
