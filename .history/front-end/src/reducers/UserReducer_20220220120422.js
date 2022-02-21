import {GET_USER, GET_HISTORIQUE, GET_RDV, GET_ALL_RDV} from "../Actions/UserAction";

const INITIAL_STATE = {
    getUserResponse:null,
    getHistoriqueResponse: null,
    getRdvResponse: null,
    getAllRdvResponse: null,
};

export default function UserReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER:
            return {...state, getUserResponse: action.payload};
        case GET_HISTORIQUE:
            return {...state, getHistoriqueResponse: action.payload};
        case GET_RDV:
            return {...state, getRdvResponse: action.payload};
        case GET_ALL_RDV:
            return {...state, getAllRdvResponse: action.payload};
        default:
            return state;
    }
}

