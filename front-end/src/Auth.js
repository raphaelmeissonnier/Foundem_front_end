import React, { useEffect, useState } from "react";
import Routes from "./Routes/Routes";
import { UserContext } from "./Components/UserContext";
import { useDispatch } from "react-redux";
import { getUser } from "./Actions/UserAction";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Auth = () => {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();

    useEffect(async () => {
        //On vérifie que l'user est connecté
        let response = await fetch('/authId');
        let data = await response.json();
        setUserId(data.id_utilisateur);
        console.log("Response /authId: ", data);

        //Si l'user est connecté alors on récupère ses informations et on les stocke (Redux)
        if(userId)
        {
            dispatch(getUser(userId));
        }
        else {
            console.log("data empty");
        }
    }, [userId]);


    return (
        <UserContext.Provider value={userId}>
            <Router forceRefresh={true}>
                <Routes />  
            </Router>
        </UserContext.Provider>
    );
};

export default Auth;