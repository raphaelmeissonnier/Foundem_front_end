import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as moment from "moment";
import i18n from "../Translation/i18n";


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

    async function affiche_tableau(){
        if(user.id_utilisateur) {
            const res = await fetch('/users/'+user.id_utilisateur+'/historique')
                .then(response => response.json()
                    .then(data => (data.result >= 0 ? data.message : null) ));

            console.log("Historique ",res);

            return(
                <div>
                    <table style={tableStyle}>
                        <thead>
                        <tr style={trHoverStyle}>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Intitule</th>
                            <th style={thStyle}>Valeur</th>
                        </tr>
                        </thead>
                        <tbody>
                        {res.map(item => {
                            return(
                                <tr style={trChildStyle} key={item.id_objet}>
                                    <td style={tdStyle}>{moment(item.date_rdv || item.date_recompense).format("L")}</td>
                                    <td style={tdStyle}>{_.capitalize(item.intitule)}</td>
                                    <td style={tdStyle}>{_.capitalize(item.valeur)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    
    return(
        <div>
            <h3>{i18n.t(monSolde.myBalance)} {solde}</h3>
            <button onClick={()=>convertir()}>{i18n.t(monSolde.convertPoints)}</button>
        </div>

    )
}

export default MonSolde;