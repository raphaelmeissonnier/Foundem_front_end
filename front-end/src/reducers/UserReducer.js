import {GET_USER, GET_HISTORIQUE} from "../Actions/UserAction";

const INITIAL_STATE = {
    getUserResponse:null,
    getHistoriqueResponse: null,
};

export default function UserReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER:
            return {...state, getUserResponse: action.payload};
        case GET_HISTORIQUE:
            return {...state, getHistoriqueResponse: action.payload};
        default:
            return state;
    }
}

