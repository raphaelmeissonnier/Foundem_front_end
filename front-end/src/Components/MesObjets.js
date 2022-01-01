import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getFoundItems, getLostItems} from "../Actions/ObjetsAction";
import {Button} from "@material-ui/core";
import _ from "lodash";
import * as moment from "moment";
import {tableStyle, tdStyle, thStyle, trHoverStyle, trChildStyle} from "./styles";


const MesObjets  = () => {

    let objetsTrouvesResponse = useSelector((state) => state.ObjetsReducer.getFoundItemsResponse);
    let objetsPerdusResponse = useSelector((state) => state.ObjetsReducer.getLostItemsResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const [showFoundItems, setShowFoundItems] = useState(false);
    const [showLostItems, setShowLostItems] = useState(false);

    useEffect(async () => {
        if(userID)
        {
            dispatch(getFoundItems(userID));
            dispatch(getLostItems(userID));
        }
    }, [userID, showFoundItems])

    function handleClickFound()
    {
        setShowFoundItems(true);
        setShowLostItems(false);
    }

    function handleClickLost()
    {
        setShowFoundItems(false);
        setShowLostItems(true);
    }

    async function accepter(idObjetTrouve)
    {
        //On récupère l'id de l'objet perdu associé à l'objet trouvé matché
        const idObjetPerdu = await fetch('/objetsmatche/'+idObjetTrouve)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.objetperdu_id)));
        console.log("Accepter: ", idObjetPerdu);

        //On récupère l'adresse mail de l'utilisateur de l'objet perdu
        const idUserObjetPerdu = await fetch('/objetsperdus/'+idObjetPerdu)
            .then(response => response.json()
                .then(data => (data.result==0 ? data.message : data.user_id)))
        console.log("Accepter: ", idUserObjetPerdu);
        const adresseMail = await fetch('/users/'+ idUserObjetPerdu)
            .then(response => response.json()
                .then(data => data.email));
        console.log("Accepter: ", adresseMail);

        //On supprime le match
        await fetch('/objetsmatche/' + idObjetTrouve, {method: 'DELETE'})
            .then(response => response.json()
                .then(data => console.log("Delete match: ", data.message)))

        //On met à jour les états des objets perdus et trouvés
        const requestOptions = {
            port: 3001,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({etat: 3})
        };
        await fetch('/objetsperdus/' + idObjetPerdu, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetPerdu MAJ :", data.message)));
        await fetch('/objetstrouves/' + idObjetTrouve, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetTrouve MAJ :", data.message)));

        //On affiche l'adresse mail de l'utilisateur de l'objet perdu
        window.alert("Vous venez d'accepter un match ! Grâce à vous un objet sera restitué à son propriétaire. Voici son adresse mail: "+ adresseMail);
        window.location.reload(true);
    }

    async function refuser(idObjetTrouve)
    {
        //On récupère l'id de l'objet perdu associé à l'objet trouvé matché
        const idObjetPerdu = await fetch('/objetsmatche/'+idObjetTrouve)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.objetperdu_id)));
        console.log("Refuser: ", idObjetPerdu);

        //On met à jour les états des objets perdus et trouvés
        const requestOptions = {
            port: 3001,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({etat: 1})
        };
        await fetch('/objetsperdus/' + idObjetPerdu, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetPerdu MAJ :", data.message)));
        await fetch('/objetstrouves/' + idObjetTrouve, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetTrouve MAJ :", data.message)));

        //On supprime le match
        await fetch('/objetsmatche/' + idObjetTrouve, {method: 'DELETE'})
            .then(response => response.json()
                .then(data => console.log("Delete match: ", data.message)))

        window.alert("Vous avez supprimé le match !");
        window.location.reload(true);
    }

    function translateStatus(etat){
        if(etat == 1){
            return "Perdu"
        }
        else if(etat == 2){
            return "En cours de Matching"
        }
        else if(etat == 3){
            return "Objet Matché"
        }
        else{
            return "NaN"
        }

    }

    //J'affiche ces objets trouvés selon leur état
    function afficher(items)
    {
        if(items != null )
        {
            return(
                <div>
                    <table style={tableStyle}>
                        <thead>
                        <tr style={trHoverStyle}>
                            <th style={thStyle}>Intitulé</th>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>Catégorie</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Statut</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => {
                            return(
                                <tr style={trChildStyle} key={item.id}>
                                    <td style={tdStyle}>{_.capitalize(item.intitule)}</td>
                                    <td style={tdStyle}>{_.capitalize(item.description)}</td>
                                    <td style={tdStyle}>{_.capitalize(item.categorie)}</td>
                                    <td style={tdStyle}>{moment(item.date).format("L")}</td>
                                    <td style={tdStyle}>{translateStatus(item.etat)}</td>
                                    {showFoundItems && item.etat==2 ? <td style={tdStyle}><button onClick={() => accepter(item.id)}>Accepter</button> <button value={item.id} onClick={() => refuser(item.id)}>Refuser</button></td> : null }
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    return(
        <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h1>Mes Objets</h1>
            <Button
                variant="outlined"
                style={{
                    borderRadius: 2,
                    backgroundColor: "#5fa082",
                    padding: "5px 20px",
                    fontSize: "15px"
                }}
                variant="contained"
                onClick={() => handleClickLost()}
            >
                Mes objets perdus
            </Button>
            <Button
                variant="outlined"
                style={{
                    borderRadius: 2,
                    backgroundColor: "#5fa082",
                    padding: "5px 20px",
                    fontSize: "15px"
                }}
                variant="contained"
                onClick={() => handleClickFound()}
            >
                Mes objets trouvés
            </Button>
            {showFoundItems ? afficher(objetsTrouvesResponse) : showLostItems ? afficher(objetsPerdusResponse) : null }
        </div>
    )
}

export default MesObjets;