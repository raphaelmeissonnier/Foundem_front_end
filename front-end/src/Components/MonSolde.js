import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as moment from "moment";


const MonSolde = () =>{

    const user = useSelector((state)=> state.UserReducer);
    const [solde, setSolde] = useState(null);

    //Récupérer le solde du user
    useEffect(async()=>{
        //FAIRE UN DISPATCH SUR LE USER
        setSolde(user.solde); 
    }, [user.solde])

    //Récupérer la liste des récompenses existantes
    //Créer un GroupButton où chaque bouton aurait l'id de la récompense

    //Créer une récompense
    async function convertir()
    {
        console.log("user_id", user.id_utilisateur);
        if(user.id_utilisateur) {
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user.id_utilisateur,
                    date: moment(new Date()).format("YYYY-MM-DD"),
                    recompense_id: "1"
                })
            };
            await fetch('/listeRecompense', requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.message + "https://www.mavieencouleurs.fr/")));
        }
    }
    
    return(
        <div>
            <h3>Mon Solde : {solde}</h3>
            <button onClick={()=>convertir()}>Débloquer une récompense</button>
        </div>

)
    
}

export default MonSolde;