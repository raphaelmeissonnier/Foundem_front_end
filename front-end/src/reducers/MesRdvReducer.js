import {GET_RDV} from "../Actions/MesRdvAction";

const INITIAL_STATE = {
    getMesRdvResponse:null,
};

export default function ObjetsReducer (state = INITIAL_STATE , action) {
    switch (action.type) {
        case GET_RDV:
            return { ...state, getMesRdvResponse: action.payload };
        default:
            return state;
    }
}

