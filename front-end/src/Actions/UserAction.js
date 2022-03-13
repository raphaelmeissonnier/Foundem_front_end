export const GET_USER = "GET_USER";
export const GET_HISTORIQUE = "GET_HISTORIQUE";
export const GET_RDV = "GET_RDV";
export const GET_ALL_RDV = "GET_ALL_RDV"

/*API call getting user information*/
export const getUser = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/users/'+uid);
            let data = await response.json();
            console.log("UserAction - getUser: ", data);
            dispatch({type: GET_USER, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};

/*API call getting history user*/
export const getHistorique = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/users/'+uid+'/historique')
            let data = await response.json();
            console.log("UserAction - getHistorique: ", data);
            dispatch({type: GET_HISTORIQUE, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};

/*API call getting rdv user*/
export const getRdv = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/users/'+uid+'/rdv');
            let data = await response.json();
            console.log("UserAction - getRdv: ", data);
            dispatch({type: GET_RDV, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};

export const getAllRdv = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/users/'+uid+'/rdv/count');
            let data = await response.json();
            console.log("UserAction - count - getALLRdv: ", data);
            dispatch({type: GET_ALL_RDV, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
}
