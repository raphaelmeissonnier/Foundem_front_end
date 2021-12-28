import {GET_FOUND_ITEMS, GET_LOST_ITEMS} from "../Actions/ObjetsAction";

const INITIAL_STATE = {
    getLostItemsResponse:null,
    getFoundItemsResponse: null,
};

export default function ObjetsReducer (state = INITIAL_STATE , action) {
    switch (action.type) {
        case GET_LOST_ITEMS:
            return { ...state, getLostItemsResponse: action.payload };
        case GET_FOUND_ITEMS:
            return { ...state, getFoundItemsResponse: action.payload };
        default:
            return state;
    }
}

