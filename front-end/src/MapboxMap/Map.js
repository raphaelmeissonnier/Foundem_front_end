import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import './Map.css'
import { fromLonLat } from "ol/proj";
//import marker from "./images/marker.svg"
import { styled } from '@material-ui/core/styles';
import {FormControlLabel, FormLabel, Paper, Radio, RadioGroup} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import SuggestionObjetPerdu from '../Components/SuggestionObjetPerdu';

const {config} = require('../config');


mapboxgl.accessToken = config.MY_API_TOKEN;


const Map = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(2.21);
    const [lat, setLat] = useState(48.90);
    const [longUser, setLongUser] = useState(null);
    const [latUser, setLatUser] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [rayon, setRayon] = useState(100);

    const [items, setItems] = useState([]);
    const [items2] = useState([]);
    const [itemsInfos] = useState([]);
    
    const [features] = useState([]);
    const [changed, setChanged] = useState(1);

    if ("geolocation" in navigator) { 
        navigator.geolocation.getCurrentPosition(position => { 
            console.log(position.coords.latitude, position.coords.longitude); 
            setLongUser(position.coords.longitude);
            setLatUser(position.coords.latitude);
        }); 
    } else { /* geolocation IS NOT available, handle it */ }

    
    useEffect(() => {
       
        if (map.current) return; // initialize map only once
        else if(longUser && latUser){
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longUser,latUser],
                zoom: zoom,
                width: 300
            });
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                trackUserLocation: true
            });
            // Add the control to the map.
            map.current.addControl(geolocate);
            // Set an event listener that fires
            // when a geolocate event occurs.
            geolocate.on('geolocate', () => {
                var userlocation = geolocate._lastKnownPosition;
                var lati = userlocation.coords.latitude
                var long = userlocation.coords.longitude
                console.log('A geolocate event has occurred.',lati, long);
            });
        }
        
               
    }, [rayon]);

    function ajoutMarkers(map,tabObjets){
        for(var i=0; i< tabObjets.length;i++){
            const el = document.createElement("div");
            el.className = "marker ";
            console.log("Longitude Marker ",tabObjets[i][0].localisation.position.longitude)
            console.log("Latitude Marker ",tabObjets[i][0].localisation.position.latitude)
            new mapboxgl.Marker(el)
                .setLngLat([tabObjets[i][0].localisation.position.longitude,tabObjets[i][0].localisation.position.longitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h5><b>Intitulé : ${tabObjets[i][0].intitule}</b></h5>
                            <p>Description : ${tabObjets[i][0].description}</p>
                            <p>Le <b>${tabObjets[i][0].date}</b></p>` 
                        )
                )
                .addTo(map);
        }
        console.log("Markers crées")

    }


    //Au chargement de la page, on récupère les objets perdus et trouvés depuis le back
    useEffect(async () => {
        if(longUser && latUser && rayon){
        //On récupère les objets perdus
        let response_perdu = await fetch("/objetsperdus/"+longUser+"/"+latUser+"/"+rayon);
        let data_perdu = await response_perdu.json();

        //On récupère les objets trouvés
        let response_trouve = await fetch("/objetstrouves/"+longUser+"/"+latUser+"/"+rayon);
        let data_trouve = await response_trouve.json();

        console.log("MyMap.js - data_perdu",data_perdu)
        console.log("MyMap.js - data_trouve",data_trouve);

        //Concaténation des tableaux d'objets trouvés et perdus
        var objets_concat = data_perdu.concat(data_trouve);
        console.log("MyMap.js - Objets_concat: ", objets_concat);
        setItems(objets_concat);
        console.log("MyMap.js - items: ", items);
        setChanged(changed+1);
        }
    }, [rayon]);

    useEffect( async() =>{
        console.log("2ème UseEffect - On vide items2");
        await ajoutMarkers(map.current,items)
  
    }, [items])

    /*function _handleRayonChange(e)
    {
        setRayon(e.target.value);
        console.log("Rayon:", rayon);
    }

    const Item = styled(Paper)(({ theme }) => ({}));*/

    return (
        <div>
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
          <div style={{height:'400px', width:'800px'}}className="map-container" ref={mapContainer} />
            {/*<div>
                <Stack direction="row" spacing={2} >
                    <Item elevation={8} style={{width:'70%', marginLeft:'10px', marginRight:'10px', marginBottom:'10px', marginTop:'10px', textAlign:'center'}}>
                        <FormLabel style={{color:'black', fontFamily:'Arvo', fontSize:20}}>Résultats: <b>{items.length}</b> objets proches de votre localisation</FormLabel>
                        <Map />
                        <div style={{flexDirection:"row", display:'flex', alignItems:'center', justifyContent:'center' }}>
                            <FormLabel style={{color:'black', fontFamily:'Arvo', fontSize:20, marginRight:"5px"}}>Dans un rayon de</FormLabel>
                            <RadioGroup onChange={_handleRayonChange} value={rayon} row>
                                <FormControlLabel value="5" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="5km" />
                                <FormControlLabel value="10" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="10km" />
                                <FormControlLabel value="15" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="15km" />
                                <FormControlLabel value="20" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="20km" />
                            </RadioGroup>
                        </div>
                    </Item>

                    {longUser > 0 && latUser > 0 ? <SuggestionObjetPerdu longitude={longUser} latitude={latUser} /> : null }

                </Stack>

            </div>*/}
        </div>
    );

}


export default Map