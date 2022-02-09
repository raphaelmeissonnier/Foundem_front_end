import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useEffect, useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Agenda.css";
import Geocoder from "react-mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Redirect} from "react-router-dom";
import * as moment from "moment";
import i18n from "../../../Translation/i18n";

const {config} = require('../../../config');
const mapboxApiKey = config.MY_API_TOKEN;
const params = { country: "fr" };


const locales = {
    "fr": require("date-fns/locale/fr"),
};


const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

const Agenda = (props) =>{
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const viewport2 = { width: 400, height: 400 };
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [firstUser, setFirstUser] = useState(null);
    const [secondUser, setSecondUser] = useState(null);
    const [objetMatche, setObjetMatche] = useState(null);
    const [created, setCreated] = useState(false);

    useEffect(async () =>{
        //on récupère le firstUser, le secondUser, le matcheObjet A MODIFIER
        setFirstUser(props.match.params.firstUser);
        setSecondUser(props.match.params.secondUser);
        setObjetMatche(props.match.params.idObjetmatche);
    });


    async function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);

        //On vérifie que tous les champs sont renseignés
        if(!newEvent.end || !longitude || !latitude || !firstUser || !secondUser || !objetMatche)
        {
            console.log("Agenda.js - Parameters required");
            console.log("Date: ", newEvent.end);
            console.log("longitude: ", longitude);
            console.log("latitude: ", latitude);
            console.log("first_user: ", firstUser);
            console.log("second_user: ", secondUser);
            console.log("objet_matche: ", objetMatche);
        }
        else
        {
            //On appelle la route de création d'un rdv
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ date_rdv: moment(newEvent.end).format("YYYY-MM-DD"), longitude: parseFloat(longitude), latitude: parseFloat(latitude), user_perdu: firstUser, user_trouve: secondUser, objet_matche: objetMatche})
            };
            await fetch('/objetsmatche/rdv', requestOptions)
                .then(response => response.json()
                    /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                        Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                    */
                    .then(data => data.result ? (window.alert(data.msg), setCreated(true)) : window.alert(data.msg)));
        }
    }

    //Récupération de la longitude et latitude à partir de l'adresse
    function onSelected(viewport, item){
        console.log("Item",item.place_name)
        console.log("Item",item)
        setLongitude(item.center[0])
        setLatitude(item.center[1])
        console.log("Item long",typeof(item.center[0]))
    }

    return (
        <div className="Agenda">

            <h1>{i18n.t('agenda.calendar')}</h1>
            <center>
            <h2>{i18n.t('agenda.addRdv')}</h2>
            <div>
                <input type="text" placeholder="Ajouter un titre" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <input type="time" placeholder="Horaire" style={{ width: "20%", marginRight: "10px" }} value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
                <br></br>

                <label>{i18n.t('ajoutObjet.address')}</label>
                <Geocoder
                    mapboxApiAccessToken={mapboxApiKey}
                    hideOnSelect={true}
                    onSelected={onSelected}
                    viewport={viewport2}
                    updateInputOnSelect={true}
                    initialInputValue=" "
                    queryParams={params}
                />

                <DatePicker placeholderText="Début date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />

                <DatePicker placeholderText="Fin Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />

                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    {i18n.t('agenda.addRdv')}
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
         </center>
            {created ? <Redirect to="/"/> : console.log("Agenda.js - not redirected to home page")}
        </div>

    );
}
export default Agenda;