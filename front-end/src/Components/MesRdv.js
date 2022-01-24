import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getMesRdv} from "../Actions/MesRdvAction";
import {tableStyle, tdStyle, thStyle, trChildStyle, trHoverStyle} from "./styles";
import _ from "lodash";
import * as moment from "moment";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Divider from "@mui/material/Divider";
import {Redirect} from "react-router-dom";
import {config} from "../config";

const MesRdv = () =>{

    let mesRdv = useSelector((state) => state.MesRdvReducer.getMesRdvResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const mesRdv2 = new Array();
    const mapboxApiKey = config.MY_API_TOKEN;
    const [accepted, setAccepted] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(async () => {
        if(userID)
        {
            console.log("dans le if");
            await dispatch(getMesRdv(userID));

        }
        console.log("mes rdv", mesRdv);
        setChanged(true);
        if(mesRdv){
            for(var i = 0; i<mesRdv.length; i++){
                var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+mesRdv[i].longitude+","+mesRdv[i].latitude+".json?access_token="+mapboxApiKey)
                var repAddr = await addr.json();
                console.log("ADRESSE",repAddr);
                mesRdv2[i]=[mesRdv[i],repAddr.features[2].place_name]
            }
            console.log("mes rdv2", mesRdv2);
        }
    }, [userID, changed])


    async function accepter(id_rdv, date, longitude, latitude) {
      /*  '/users/:id/rdv/:idrdv'
        const requestOptions = {
            port: 3001,
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({date: 1})
        };
        await fetch('/objetsperdus/' + idObjetPerdu, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetPerdu MAJ :", data.message)));

       */
    }

    function refuser(id_rdv) {

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
                            <th style={thStyle}>date_rdv</th>
                            <th style={thStyle}>etat</th>
                            <th style={thStyle}>lieu</th>

                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => { console.log("idrdv", item[0].id_rdv)
                            /*return(
                                <tr style={trChildStyle} key={item.id_rdv}>
                                    <td style={tdStyle}>{moment(item.date_rdv).format("L")}</td>
                                    <td style={tdStyle}>{_.capitalize(item.etat)}</td>
                                    <td style={tdStyle}>{_.capitalize(item[1])}</td>
                                    {item.etat=="en cours" ? <td style={tdStyle}><button onClick={() => accepter(item.id_rdv)}>Accepter</button> <button value={item.id_rdv} onClick={() => refuser(item.id_rdv)}>Refuser</button></td> : null }
                                </tr>
                            );*/
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
            <h1>Mes Rdv</h1>
            <br></br>
            <Divider></Divider>
            <br></br>
            { afficher(mesRdv2) }
            <br></br>
            <Divider></Divider>
            <br></br>

            {accepted ? window.alert("Votre RDV est confirmé !"): console.log("pas de redirection")}
        </div>
    )
}

export default MesRdv;