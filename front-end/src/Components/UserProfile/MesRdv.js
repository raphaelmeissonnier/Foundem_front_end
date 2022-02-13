import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {tableStyle, tdStyle, thStyle, trChildStyle, trHoverStyle} from "../Objet/AjoutObjet/styles";
import _ from "lodash";
import * as moment from "moment";
import {config} from "../../config";
import i18n from "../../Translation/i18n";
import {getRdv} from "../../Actions/UserAction";


const MesRdv = () => {

    let mesRdv = useSelector((state) => state.UserReducer.getRdvResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const mapboxApiKey = config.MY_API_TOKEN;
    const [accepted, setAccepted] = useState(false);
    const [items, setItems] = useState([]);

    //Récupération ds rdv
    useEffect(async () => {
        if (userID) {
            dispatch(getRdv(userID));
        }
    }, [userID])

    useEffect(async () => {
        if(mesRdv)
        {
            console.log("Mes rdv not null");
            setItems(await recuperationLieu(mesRdv));
        }
    })

    //Récupération du lieu
    async function recuperationLieu(listeRdv) {
        let rdvLocal = [];
        for (var i = 0; i < listeRdv.length; i++) {
            var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + listeRdv[i].longitude + "," + listeRdv[i].latitude + ".json?access_token=" + mapboxApiKey)
            var repAddr = await addr.json();
            console.log("ADRESSE", repAddr);
            listeRdv[i].place = repAddr.features[2].place_name;
            rdvLocal[i] = listeRdv[i];
        }
        return rdvLocal;
    }


    async function accepter(id_rdv, date, longitude, latitude) {
        if (id_rdv && date && longitude && latitude) {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    longitude: longitude,
                    latitude: latitude,
                    date: moment(date).format("YYYY-MM-DD"),
                    etat: "valide"
                })
            };
            await fetch('/users/' + userID + '/rdv/' + id_rdv, requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.msg)));
        } else {
            console.log("MesRdv.js - Parameters required");
        }
    }

    async function refuser(id_rdv, date, longitude, latitude) {
        if (id_rdv && date && longitude && latitude) {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    longitude: longitude,
                    latitude: latitude,
                    date: moment(date).format("YYYY-MM-DD"),
                    etat: "refuse"
                })
            };
            await fetch('/users/' + userID + '/rdv/' + id_rdv, requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.msg)));
        } else {
            console.log("MesRdv.js - Parameters required");
        }
    }

    function afficher() {
        return (
            <div>
                <table style={tableStyle}>
                    <thead>
                    <tr style={trHoverStyle}>
                        <th style={thStyle}>{i18n.t('chercherObjet.date')}</th>
                        <th style={thStyle}>{i18n.t('mesObjets.place')}</th>
                        <th style={thStyle}>{i18n.t('mesObjets.status')}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {items ? items.map(item => {
                            console.log("item:", item);
                            return (
                                <tr style={trChildStyle} key={item.id_rdv}>
                                    <td style={tdStyle}>{moment(item.date_rdv).format("L")}</td>
                                    <td style={tdStyle}>{item.place}</td>
                                    <td style={tdStyle}>{_.capitalize(item.etat)}</td>
                                    {item.etat === "en cours" ? <td style={tdStyle}>
                                        <button
                                            onClick={() => accepter(item.id_rdv, item.date_rdv, item.longitude, item.latitude)}>{i18n.t('mesObjets.accept')}</button>
                                        <button value={item.id_rdv}
                                                onClick={() => refuser(item.id_rdv, item.date_rdv, item.longitude, item.latitude)}>{i18n.t('mesObjets.decline')}</button>
                                    </td> : null}
                                </tr>
                            );
                        }) : null}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <h1>{i18n.t('mesRdv.title')}</h1>
            {items != null ? afficher() : console.log("mesRdv null")}
            {accepted ? window.alert("Votre RDV est confirmé !") : console.log("pas de redirection")}
        </div>
    )
}

export default MesRdv;