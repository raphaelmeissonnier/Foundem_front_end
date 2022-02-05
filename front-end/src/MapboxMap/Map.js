
import { width } from '@mui/system';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
const {config} = require('../config');

mapboxgl.accessToken = config.MY_API_TOKEN;


const Map = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(2.21);
    const [lat, setLat] = useState(48.90);
    const [zoom, setZoom] = useState(12);

    
    useEffect(() => {
       
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            width: 30000
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

                    var lat = userlocation.coords.latitude
                    var long = userlocation.coords.longitude
                    console.log('A geolocate event has occurred.',lat, long);
                    //Ajouter un marker plus cercle pour localiser le user sur la map
                });
    });

    return (
        <div>
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
          <div style={{height:'400px', width:'800px'}}className="map-container" ref={mapContainer} />
        </div>
    );

}


export default Map