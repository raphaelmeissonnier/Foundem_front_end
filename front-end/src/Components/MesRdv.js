import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {tableStyle, tdStyle, thStyle, trChildStyle, trHoverStyle} from "./styles";
import _ from "lodash";
import * as moment from "moment";
import Divider from "@mui/material/Divider";
import {config} from "../config";

const MesRdv = () =>{

    //let mesRdv = useSelector((state) => state.MesRdvReducer.getMesRdvResponse);
    const [mesRdv, setMesRdv] = useState(null);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    //const mesRdv2 = new Array();
    const mapboxApiKey = config.MY_API_TOKEN;
    const [accepted, setAccepted] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect( async() => {
        if(userID)
        {
            /*console.log("dans le if");
            dispatch(getMesRdv(userID));*/
            //On récupère les RDV de l'utilisateur
            let response = await fetch('/users/'+userID+'/rdv');
            let data = await response.json();
            console.log('data', data);
            setMesRdv(data);
            /*for(var i = 0; i<data.length; i++){
                var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+data[i].longitude+","+data[i].latitude+".json?access_token="+mapboxApiKey)
                var repAddr = await addr.json();
                console.log("ADRESSE",repAddr);
                mesRdv[i]=[data[i],repAddr.features[2].place_name]
            }*/
        }
    }, [userID])
    console.log("MesRdv.js - mesRdv: ", mesRdv);


    async function accepter(id_rdv, date, longitude, latitude)
    {
        if(id_rdv && date && longitude && latitude) {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({longitude: longitude, latitude: latitude, date: moment(date).format("YYYY-MM-DD"), etat: "valide"})
            };
            await fetch('/users/' + userID + '/rdv/' + id_rdv, requestOptions)
                .then(response => response.json()
                    .then(data => console.log("MesRdv MAJ :", data.msg)));
        }
        else {
            console.log("MesRdv.js - Parameters required");
        }
    }

    async function refuser(id_rdv, date, longitude, latitude) {
        if(id_rdv && date && longitude && latitude) {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({longitude: longitude, latitude: latitude, date: moment(date).format("YYYY-MM-DD"), etat: "refuse"})
            };
            await fetch('/users/' + userID + '/rdv/' + id_rdv, requestOptions)
                .then(response => response.json()
                    .then(data => console.log("MesRdv MAJ :", data.msg)));
        }
        else {
            console.log("MesRdv.js - Parameters required");
        }
    }

    function afficher(items)
    {
        if(items != null )
        {
            return(
                <div>
                    <table style={tableStyle}>
                        <thead>
                        <tr style={trHoverStyle}>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Etat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items !=null ? items.map(item => {
                            return(
                                <tr style={trChildStyle} key={item.id_rdv}>
                                    <td style={tdStyle}>{moment(item.date_rdv).format("L")}</td>
                                    <td style={tdStyle}>{_.capitalize(item.etat)}</td>
                                    {item.etat=="en cours" ? <td style={tdStyle}><button onClick={() => accepter(item.id_rdv, item.date_rdv, item.longitude, item.latitude)}>Accepter</button> <button value={item.id_rdv} onClick={() => refuser(item.id_rdv, item.date_rdv, item.longitude, item.latitude)}>Refuser</button></td> : null }
                                </tr>
                            );
                        }) : <h1>RDV NULL DANS AFFICHAGE</h1>}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
    return(
        <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h1>Mes Rdv</h1>
            <br></br>
            <Divider></Divider>
            <br></br>
            {mesRdv !=null ? afficher(mesRdv) : console.log("mesRdv null")}
            <br></br>
            <Divider></Divider>
            <br></br>
            {accepted ? window.alert("Votre RDV est confirmé !"): console.log("pas de redirection")}
        </div>
    )
}

export default MesRdv;