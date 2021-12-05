import React, { useState,useEffect } from "react";
const moment = require('moment')
const {config} = require('../config');



const SuggestionObjetPerdu = (props) => {

    const mapboxApiKey = config.MY_API_TOKEN;
    const params = {
        country: "fr"
    }    
    const [items2, setItems2] = useState([]);

    
    var longitude = props.longitude;
    console.log("longitude", longitude);
    var latitude = props.latitude;
    console.log("latitude", latitude);

    useEffect(async () => {
        let responseSugg = await fetch("/objets/"+longitude+"/"+latitude);
        let dataSugg = await responseSugg.json();
        console.log("apres le fetch",dataSugg)
    
        if(dataSugg.length >0){

            for(var i=0; i<dataSugg.length;i++){
                var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+dataSugg[i][0].localisation.position.longitude+","+dataSugg[i][0].localisation.position.latitude+".json?access_token="+mapboxApiKey)
                var repAddr = await addr.json();
                console.log("ADRESSE",repAddr);
                items2[i]=[dataSugg[i],repAddr.features[2].place_name]    
            }     
        }   
    }, [longitude,latitude]);
      

    console.log("ITEMS2", items2)

    return(
        <div id="listArticle">
            <ul>
                <li id="elt_sugg">
                    {items2.length>0 ? items2.map(item =>{
                    return  <article key={item}>
                                <div >
                                    <h3 id="titre_item">{(item[0][0].intitule)}</h3>
                                    <div><p>{(item[0][0].description) }</p></div>
                                    <div><p>{ (moment(item[0][0].date).format('DD/MM/YYYY'))}</p></div>
                                    <div><p>{(item[1]) }</p></div>
                                    <br></br>
                                </div>
                            </article>    
                    }): null } 
                </li>
            </ul>
        </div>
      )
}

export default SuggestionObjetPerdu;