export const GET_USER = "GET_USER";

export const getUser = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/users/'+uid);
            let data = await response.json();
            console.log("UserAction - data: ", data);
            dispatch({type: GET_USER, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};

