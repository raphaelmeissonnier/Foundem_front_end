import React, { useState,useEffect } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector,cluster } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";
import {getLocation} from './App';
import App from "./App"

import mapConfig from "./config.json";
import "./App.css";


const MyMap = () => {

  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(16);

  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);


  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });

  //On récupère les données depuis le back
  useEffect(async () => {
    let response = await fetch("/objets");
    let data = await response.json();
    setItems(data);
  }, []);

  //On vérifie que les données soient bien récupérées
    console.log("Items", items);

  //On récupère les longitudes et latitudes des objets
  for(var i=0; i<items.length;i++)
  {
    items2[i] = [items[i].localisation.longitude, items[i].localisation.latitude]
  }

  //On vérifie qu'on a bien que les long et lat
  console.log("Items2", items2);

  const [features, setFeatures] = useState([]);

  //Transformation du tableau en points
  for(var j=0; j<items2.length; j++)
  {
    features[j] = new Feature({
        geometry: new Point(fromLonLat(items2[j])),
    });
    features[j].setStyle(iconStyle);
  }

  console.log("features", features);

  var test=vector({features});
  console.log("tesssssss",test)

  
  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {features.length>0 && <VectorLayer source={cluster(test)} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default MyMap;
