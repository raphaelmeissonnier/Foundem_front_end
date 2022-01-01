import {GET_OBJETSPERDUS} from "../Actions/ObjetsPerdusAction";

const INITIAL_STATE = {};

export default function ObjetsPerdusReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_OBJETSPERDUS:
            return action.payload;
        default:
            return state;
    }
};

