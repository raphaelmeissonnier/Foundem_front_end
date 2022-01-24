import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Agenda.css";
import Geocoder from "react-mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Redirect} from "react-router-dom";


const {config} = require('../config');
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

function Agenda(props) {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const viewport2 = { width: 400, height: 400 };
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [created, setCreated] = useState(false);


    async function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        //Création du rdv
        const requestOptions = {
            port: 3001,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({longitude: longitude, latitude: latitude, date_rdv: newEvent.end, user_perdu: props.params.match.first_user, user_trouve: props.params.match.second_user, objet_matche: props.params.match.objet_matche})
        };
        await fetch('/objetsmatche/rdv', requestOptions)
            .then(response => response.json()
                .then(data => console.log("Agenda.js - rdv created :", data.message)));
        setCreated(true);
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

            <h1>Calendar</h1>
            <center>
            <h2>Ajouter un rendez-vous</h2>
            <div>
                <input type="text" placeholder="Ajouter un titre" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <input type="time" placeholder="Horaire" style={{ width: "20%", marginRight: "10px" }} value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
                 <br></br>
                 <label>Adresse:</label>
                                    <Geocoder
                                        mapboxApiAccessToken={mapboxApiKey}
                                        hideOnSelect={true}
                                        onSelected={onSelected}
                                        viewport={viewport2}
                                        updateInputOnSelect={true}
                                        initialInputValue=" "
                                        queryParams={params}
                                    /><DatePicker placeholderText="Début date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="Fin Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Ajouter un rdv
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
         </center>
            {created ? <Redirect to="/" /> : console.log("Agenda.js - not redirected to home page")}
        </div>
    );
}
export default Agenda;