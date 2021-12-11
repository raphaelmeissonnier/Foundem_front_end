import {GET_USER} from "../Actions/UserAction";

const INITIAL_STATE = {};

export default function UserReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        default:
            return state;
    }
};

