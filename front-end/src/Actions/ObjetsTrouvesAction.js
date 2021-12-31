export const GET_OBJETSTROUVES = "GET_OBJETSTROUVES";

export const getObjetsPerdus = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('objetstrouves/'+uid);
            let data = await response.json();
            console.log("ObjetsTrouvesAction - data: ", data);
            dispatch({type: GET_OBJETSTROUVES, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};