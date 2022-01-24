import {GET_RDV} from "../Actions/MesRdvAction";

const INITIAL_STATE = {
    getRdvResponse:null,
};

export default function MesRdvReducer (state = INITIAL_STATE , action) {
    switch (action.type) {
        case GET_RDV:
            return { ...state, getRdvResponse: action.payload };
        default:
            return state;
    }
}

