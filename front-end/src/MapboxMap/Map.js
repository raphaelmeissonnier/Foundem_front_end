import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import './Map.css'
import { styled } from '@material-ui/core/styles';
import {FormControlLabel, FormLabel, Paper, Radio, RadioGroup} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import SuggestionObjetPerdu from '../Components/SuggestionObjetPerdu';

const {config} = require('../config');


mapboxgl.accessToken = config.MY_API_TOKEN;


const Map = (props) => {

    const mapContainer = useRef(null);
    let [map,setMap] = useState(null);
    const [lng, setLng] = useState(props.longitude.toFixed(4));
    const [lat, setLat] = useState(props.latitude.toFixed(4));
    const [longUser] = useState(props.longitude);
    const [latUser] = useState(props.latitude);
    const [zoom, setZoom] = useState(10);
    const [rayon, setRayon] = useState(100);
    const [items, setItems] = useState([]);
    const [changed, setChanged] = useState(1);


    useEffect(() => {
        // initialize map only once
        if(longUser && latUser){
            //Création de la map
            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longUser,latUser],
                zoom: zoom,
                width: 300
            });

            //Handle map mouvment
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
            });

            // Add the control to the map.
            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                trackUserLocation: true
            });
            map.addControl(geolocate);

            // Set an event listener that fires when a geolocate event occurs.
            geolocate.on('geolocate', () => {
                var userlocation = geolocate._lastKnownPosition;
                var lati = userlocation.coords.latitude
                var long = userlocation.coords.longitude
                console.log('A geolocate event has occurred.',lati, long);
            });

            //Ajout des markers au rechargement de la map
            map.on("load", () => {
                console.log("Map.js - map: on load");
                setMap(map); // We declare the map as a State to make it available for every functions.
                ajoutMarkers(map, items);
            });

            map.on('click', 'marker', ()=>{
                map.getCanvas().style.cursor = 'pointer'
            })
        }
    }, [changed, rayon]);

    //Ajout des points sur la map
    async function ajoutMarkers(laMap,tabObjets){
        for(let tabValue of tabObjets){

            //Récupération de l'occurrence
            const tab = tabValue[0];

            //Contenu de la pop-up
            const innerHtmlContent = `<h3><b>Intitulé : ${tabValue[0].intitule}</b></h3>
                            <p>Description : ${tabValue[0].description}</p>
                            <p>Le <b>${tabValue[0].date}</b></p>`;
            const divElement = document.createElement('div');
            const assignBtn = document.createElement('div');
            assignBtn.innerHTML = `<center><button class="btn btn-success btn-simple text-white"> Y Aller !</button></center>`;
            divElement.innerHTML = innerHtmlContent;
            divElement.appendChild(assignBtn);
            assignBtn.addEventListener('click', (e) => {
                console.log('Button clicked: ', tab);
                getTrajet(tab, laMap);
            });

            //Création du marker
            const el = document.createElement("div");
            el.className = "marker";
            console.log("Longitude Marker ",tabValue[0].localisation.position.longitude)
            console.log("Latitude Marker ",tabValue[0].localisation.position.latitude)
            new mapboxgl.Marker(el)
                .setLngLat([tabValue[0].localisation.position.longitude, tabValue[0].localisation.position.latitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setDOMContent(divElement)
                )
                .addTo(laMap);
        }
    }

    //Au chargement de la page, on récupère les objets perdus et trouvés depuis le back
    useEffect(async () => {
        if(longUser && latUser && rayon){
            console.log("longUser: ", longUser);
            console.log("latUser: ", latUser);
            console.log("rayon: ", rayon);
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
            console.log("Map.js - changed: ", changed);
        }
    }, [rayon]);


    //Calcul de l'itinéraire vers un point de la map
    async function getTrajet(objet,laMap){
        console.log("getTrajet");
        const rep = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/'+longUser+','+latUser+';'+objet.localisation.position.longitude+','+objet.localisation.position.latitude+'?steps=true&geometries=geojson&access_token='+config.MY_API_TOKEN);
        const json = await rep.json();
        const data = json.routes[0];
        const steps = data.legs[0].steps;
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
        if (laMap.getSource('route')) {
            laMap.getSource('route').setData(geojson);
        }
        else {
            laMap.addLayer({
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
        const instructions = document.getElementById('instructions');
        
        let tripInstructions = '';
        for (const step of steps) {
            tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        }
        instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
            data.duration / 60
            )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;

        console.log("Markers crées",tripInstructions)
    }
        

    function _handleRayonChange(e)
    {
        setRayon(e.target.value);
        console.log("Rayon:", rayon);
    }
    const Item = styled(Paper)(({ theme }) => ({}));

    return (
        <div>
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div id="instructions"></div>
            <div style={{height:'500px', width:'800px'}}className="map-container" ref={mapContainer} />
            <div>
                <Stack direction="row" spacing={2} >
                    <Item elevation={8} style={{width:'70%', marginLeft:'10px', marginRight:'10px', marginBottom:'10px', marginTop:'10px', textAlign:'center'}}>
                        <FormLabel style={{color:'black', fontFamily:'Arvo', fontSize:20}}>Résultats: <b>{items.length}</b> objets proches de votre localisation</FormLabel>
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
            </div>
        </div>
    );
}


export default Map