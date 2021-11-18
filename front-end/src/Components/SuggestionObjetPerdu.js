import React, { useState,useEffect } from "react";
const {config} = require('../config');



const SuggestionObjetPerdu = (props) => {

    const mapboxApiKey = config.MY_API_TOKEN;

    const params = {
        country: "fr"
    }

    const [items, setItems] = useState([]);
    const [date, setDate] = useState([]);
    const [adresse, setAdresse] = useState([]);
    

    var longitude = props.longitude;
    console.log("longitude", longitude);
    var latitude = props.latitude;
    console.log("latitude", latitude);

    useEffect(async () => {
        if(longitude && latitude){
          let response = await fetch("/objets/"+longitude+"/"+latitude);
          let data = await response.json();
          console.log("apres le fetch",data)
          setItems(data);
        }   
    }, []);

    var reverseGeocoding = async function ( long,lat) {
        var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+long+","+lat+".json?access_token="+mapboxApiKey)
        var repAddr = await addr.json();
        console.log("ADRESSE",typeof(repAddr.features[3].text));
        setAdresse(repAddr.features[3].text)
    }

    reverseGeocoding(2.1100964,48.8708216)

    return(
        <div id="listArticle">
            <ui>
                <li>
                    <article>
                        <div id="item">
                            <h3 id="titre_item">{items.length>0 ? (items[0][0].intitule) : null }</h3>
                            <div><p>{items.length>0 ? (items[0][0].description) : null }</p></div>
                            <div><p>{items.length>0 ? (items[0][0].date) : null }</p></div>
                            <div><p>{items.length>0 ? (adresse) : null }</p></div>
                            <br></br>
                        </div>
                    </article>
                </li>
            </ui>    
        </div>
      )
}

export default SuggestionObjetPerdu;