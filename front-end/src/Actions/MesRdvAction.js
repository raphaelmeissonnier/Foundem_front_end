export const GET_RDV = "GET_RDV";


export const getMesRdv = (uid) => {
    return async (dispatch) => {
        try{
            let response = await fetch('/users/' + uid +'/rdv');
            let data = await response.json();
            console.log("MesRdvAction - data: ", data);
            dispatch({type: GET_RDV, payload: data});
        }
        catch (e)
        {
            alert(e);
        }
    };
};
