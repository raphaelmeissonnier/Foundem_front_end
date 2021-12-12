import React, { useEffect, useState } from "react";
import Routes from "./Routes/Routes";
import { UserContext } from "./Components/UserContext";
import { useDispatch } from "react-redux";
import { getUser } from "./Actions/UserAction";
import { BrowserRouter as Router } from 'react-router-dom';

const Auth = () => {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();

    useEffect(async () => {
        console.log("On est dans Auth.js");
        let response = await fetch('/authId');
        console.log("On a fait le fetch: ", response);
        let data = await response.json();
        setUserId(data.id);
        console.log("Response /authId: ", data);

        if(data)
        {
            console.log("userID avant le dispatch: ", userId);
            dispatch(getUser(userId));
        }
        else {
            console.log("data empty");
        }
        /*const token = async () => {
            await axios({
                method: "get",
                url: backServerURL+`jwtid`,
                withCredentials: true,
            })
                .then((res) => {
                    setUid(res.data.id);
                })
                .catch((err) => {
                    console.log("No tokens");
                });
        };
        token();
        dispatch(getallPost());
        if (uid) {
            dispatch(getUser(uid));
            dispatch(getPostTrend(uid));
        }*/
    }, [userId]);

    /*useEffect( () =>{
        async function authentication()
        {
            console.log("On est dans Auth.js");
            let response = await fetch("/authId");
            let data = await response.json;
            console.log("Fetch terminé - data: ", data);
            setUserId(data.id);
        }
    }, [userId])*/
    console.log("userId: ", userId);

    return (
        <UserContext.Provider value={userId}>
            <Router>
                <Routes />
            </Router>
        </UserContext.Provider>
    );
};

export default Auth;