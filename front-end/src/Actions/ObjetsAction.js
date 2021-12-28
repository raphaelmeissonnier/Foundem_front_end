export const GET_LOST_ITEMS = "GET_LOST_ITEMS";
export const GET_FOUND_ITEMS = "GET_FOUND_ITEMS";


export const getLostItems = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/objetsperdus/user/'+uid);
            let data = await response.json();
            console.log("ObjetsAction - data: ", data);
            dispatch({type: GET_LOST_ITEMS, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};

export const getFoundItems = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/objetstrouves/user/'+uid);
            let data = await response.json();
            console.log("ObjetsAction - data: ", data);
            dispatch({type: GET_FOUND_ITEMS, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};