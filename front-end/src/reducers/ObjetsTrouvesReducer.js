import {GET_OBJETSTROUVES} from "../Actions/ObjetsTrouvesAction";

const INITIAL_STATE = {};

export default function ObjetsTrouvesReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_OBJETSTROUVES:
            return action.payload;
        default:
            return state;
    }
};

