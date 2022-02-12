import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as moment from "moment";
import _, { random } from "lodash";
import {tableStyle, tdStyle, thStyle, trHoverStyle, trChildStyle, tdStyle_pos, tdStyle_neg} from "../Objet/AjoutObjet/styles";
import i18n from "../../Translation/i18n";
import {UserContext} from "../Authentification/UserContext";
import {getUser, getHistorique} from "../../Actions/UserAction";


const MonSolde = () => {

    let user = useSelector((state) => state.UserReducer.getUserResponse);
    let hists = useSelector((state) => state.UserReducer.getHistoriqueResponse);
    const dispatch = useDispatch();
    const [solde, setSolde] = useState(null);
    const userID = useContext(UserContext);

    //Récupérer le solde du user
    useEffect(async () => {
        if(userID)
        {
            dispatch(getUser(userID));
            //Récupération du solde
            if(user)
            {
                setSolde(user.solde);
            }
            dispatch(getHistorique(userID));
        }
    }, [userID])

    //Créer une récompense
    async function convertir()
    {
        console.log("user_id", userID);
        if(userID) {
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: userID,
                    date: moment(new Date()).format("YYYY-MM-DD"),
                    recompense_id: "1"
                })
            };
            await fetch('/listeRecompense', requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.message + "https://www.mavieencouleurs.fr/")));
        }
    }

    function affiche_tableau(){
        if(hists != null) {
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
                        { hists.map(item => {
                            return(
                                <tr style={trChildStyle} key={random(10000000)}>
                                    <td style={tdStyle}>{moment(item.date).format("DD/MM/YYYY")}</td>
                                    <td style={tdStyle}>{_.capitalize(item.intitule)}</td>
                                    <td style={item.valeur_pos ? tdStyle_pos: tdStyle_neg}>{_.capitalize(  item.valeur_pos || - item.valeur_neg)}</td>
                                </tr>
                            );
                        })
                        }
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return(
        <div>
            <h3>{i18n.t('monSolde.myBalance')} {solde}</h3>
            <button onClick={()=>convertir()}>{i18n.t('monSolde.convertPoints')}</button>
            <div>{ hists ? affiche_tableau() : console.log("RES NULL")}</div>
        </div>

    )
}

export default MonSolde;