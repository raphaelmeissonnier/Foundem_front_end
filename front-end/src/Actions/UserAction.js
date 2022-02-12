export const GET_USER = "GET_USER";
export const GET_HISTORIQUE = "GET_HISTORIQUE";

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


