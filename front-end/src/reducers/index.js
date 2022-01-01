import UserReducer from "./UserReducer";
import ObjetsPerdusReducer from "./ObjetsPerdusReducer";
import ObjetsTrouvesReducer from "./ObjetsTrouvesReducer";
import {combineReducers} from "redux";

export default combineReducers({
    UserReducer,
    ObjetsPerdusReducer,
    ObjetsTrouvesReducer
});
