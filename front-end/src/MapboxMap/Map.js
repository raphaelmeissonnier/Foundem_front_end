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


const Map = (props) => {

    const mapContainer = useRef(null);
    const [map,setMap] = useState(null);
    const [lng, setLng] = useState(2.21);
    const [lat, setLat] = useState(48.90);
    const [longUser, setLongUser] = useState(props.longitude);
    const [latUser, setLatUser] = useState(props.latitude);
    const [zoom, setZoom] = useState(10);
    const [rayon, setRayon] = useState(100);

    const [items, setItems] = useState([]);
    const [changed, setChanged] = useState(1);
    
    useEffect(() => {


        if (map) return; // initialize map only once
        if(longUser && latUser){
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longUser,latUser],
                zoom: zoom,
                width: 300
            });
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
            });
            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                trackUserLocation: true
            });
            // Add the control to the map.
            map.addControl(geolocate);
            // Set an event listener that fires
            // when a geolocate event occurs.
            geolocate.on('geolocate', () => {
                var userlocation = geolocate._lastKnownPosition;
                var lati = userlocation.coords.latitude
                var long = userlocation.coords.longitude
                console.log('A geolocate event has occurred.',lati, long);
            });
            map.on("load", () => {
                setMap(map); // We declare the map as a State to make it available for every functions.
                ajoutMarkers(map, items);
            });

            map.on('click', 'marker', ()=>{
                map.getCanvas().style.cursor = 'pointer'
            })

            
        }
        
               
    }, [changed,rayon]);

    async function ajoutMarkers(map,tabObjets){
        for(var i=0; i< tabObjets.length;i++){
            const el = document.createElement("div");
            el.className = "marker ";
            console.log("Longitude Marker ",tabObjets[i][0].localisation.position.longitude)
            console.log("Latitude Marker ",tabObjets[i][0].localisation.position.latitude)
            new mapboxgl.Marker(el)
                .setLngLat([tabObjets[i][0].localisation.position.longitude,tabObjets[i][0].localisation.position.latitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3><b>Intitulé : ${tabObjets[i][0].intitule}</b></h3>
                            <p>Description : ${tabObjets[i][0].description}</p>
                            <p>Le <b>${tabObjets[i][0].date}</b></p>
                            <center><button onClick="${() => getTrajet(tabObjets[i][0],map)}"> Y aller !</button></center>` 

                        )
                )
                .addTo(map);
        }

    async function getTrajet(objet,map){
        const rep = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/'+longUser+','+latUser+';'+objet.localisation.position.longitude+','+objet.localisation.position.latitude+'?geometries=geojson&access_token='+config.MY_API_TOKEN);
        const json = await rep.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
        }
        console.log("getRoutes objet", objet)
        console.log("getRoutes data", data)
        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        }
        else {
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
        }      
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
            <div style={{height:'500px', width:'800px'}}className="map-container" ref={mapContainer} />
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