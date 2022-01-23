import './Agenda.css';
import { Calendar, dateFnsLocalize } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import React, {useState} from "react";
import DatePicker from "react-datepicker"

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022,6,20),
        end : new Date(2022,6,20)
    },

    {
        title: "Vacation",
        start: new Date(2022,04,10),
        end : new Date(2022,04,10)
    }

]
function Agenda() {

    const[newEvent, setNewEvent] = useState({title:"", start: "", end:""})
    const [allEvents, setAllEvents] = useState(events)

    return (
        <div className="Agenda">
            <Calendar localizer={localizer} events={events}
            startAccessor="start"
            endAccessor="end"
            style={height: 500, margin "50px"}} />
        </div>
    )
/*const Agenda = () => {

const user = useSelector((state) => state.UserReducer);

    return (
    <div className="Calendrier">
    <center>
    <div>



    </div>
    </center>
    </div>);

*/

}
export default Agenda;
