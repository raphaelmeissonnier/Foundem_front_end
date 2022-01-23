import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getFoundItems, getLostItems} from "../Actions/ObjetsAction";
import _ from "lodash";
import * as moment from "moment";
import {tableStyle, tdStyle, thStyle, trHoverStyle, trChildStyle} from "./styles";
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Agenda from "./Agenda";



const MesObjets  = () => {

    let objetsTrouvesResponse = useSelector((state) => state.ObjetsReducer.getFoundItemsResponse);
    let objetsPerdusResponse = useSelector((state) => state.ObjetsReducer.getLostItemsResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const [showFoundItems, setShowFoundItems] = useState(false);
    const [showLostItems, setShowLostItems] = useState(false);
    const [alignment,setAlignment]=useState('1');
    const [value, setValue] = useState('1');

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

    const handleChange = (event, parValue) => {
        if(parValue=='1'){
            handleClickLost();
            setAlignment('1');
            setValue('1')
        }
        else if (parValue=='2'){
            handleClickFound();
            setAlignment('2');
            setValue('2')
        }
      };

    async function accepter(idObjetTrouve)
    {
        /*
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
        */
        //On met à jour les états des objets perdus et trouvés
        /*
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



        /* On affiche l'adresse mail de l'utilisateur de l'objet perdu
        window.alert("Vous venez d'accepter un match ! Grâce à vous un objet sera restitué à son propriétaire. Voici son adresse mail: "+ adresseMail);
        window.location.reload(true);
      */

        //On récupère l'id de l'objet matché
        const idObjetMatche = await fetch('/objetsmatche/'+idObjetTrouve)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.id_objet_matche)));
        console.log("Accepter: ", idObjetMatche);

        //On redirige l'utilisateur vers l'agenda (en passant dans la route l'id de l'objet matché)
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
            return <Chip label="Perdu" />
        }
        else if(etat == 2){
            return <Chip label="En cours de Matching" color="info" />
        }
        else if(etat == 3){
            return <Chip label="Matché" color="success" />
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
                                <tr style={trChildStyle} key={item.id_objet}>
                                    <td style={tdStyle}>{_.capitalize(item.intitule)}</td>
                                    <td style={tdStyle}>{_.capitalize(item.description)}</td>
                                    <td style={tdStyle}>{_.capitalize(item.intitule_categorie)}</td>
                                    <td style={tdStyle}>{moment(item.date).format("L")}</td>
                                    <td style={tdStyle}>{_.capitalize(item.etat)}</td>
                                    {showFoundItems && item.etat=="en cours" ? <td style={tdStyle}><button onClick={() => accepter(item.id_objet)}>Accepter</button> <button value={item.id_objet} onClick={() => refuser(item.id_objet)}>Refuser</button></td> : null }
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
            <center>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton value="1">Mes Objets Perdus</ToggleButton>
                <ToggleButton value="2">Mes Objets Trouvés</ToggleButton>
            </ToggleButtonGroup>
            </center>
            <br></br>
            <Divider></Divider>
            <br></br>
            {showFoundItems ? afficher(objetsTrouvesResponse) :  afficher(objetsPerdusResponse) }
            <br></br>
            <Divider></Divider>
            <br></br>
        </div>
    )
}

export default MesObjets;