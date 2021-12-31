export const GET_OBJETSPERDUS = "GET_OBJETSPERDUS";

export const getObjetsPerdus = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('objetsperdus/'+uid);
            let data = await response.json();
            console.log("ObjetsPerdusAction - data: ", data);
            dispatch({type: GET_OBJETSPERDUS, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};