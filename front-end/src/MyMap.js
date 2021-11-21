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
import marker from "./images/marker.svg"

import "./App.css";


const MyMap = (props) => {

  var longitude = props.longitude;
  console.log("longitude", longitude);
  var latitude = props.latitude;
  console.log("latitude", latitude);

  const [center, setCenter] = useState([longitude,latitude]);
  const [zoom, setZoom] = useState(16);

  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [itemsInfos, setItemsInfos] = useState([]);
  const [rayon, setRayon] = useState(20);

  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: marker,
    }),
  });

  //Au chargement de la page, on récupère les données depuis le back
  useEffect(async () => {
    if(longitude && latitude && rayon){
    console.log("rayon envoyé", rayon)
      let response = await fetch("/objets/"+longitude+"/"+latitude+"/"+rayon);
      let data = await response.json();
      console.log("apres le fetch",data)
      setItems(data);
    }
  }, [rayon]);

  //On vérifie que les données soient bien récupérées
  console.log("Items", items);

  //On récupère les longitudes et latitudes des objets
  for(var i=0; i<items.length;i++)
  {
    items2[i] = [items[i][0].localisation.position.longitude, items[i][0].localisation.position.latitude];
    itemsInfos[i] = [items[i][0].categorie, items[i][0].intitule, items[i][0].description, items[i][0].date] ;
  }

  //On vérifie qu'on a bien que les long et lat
  console.log("Items2", items2);
  console.log("ItemsInfos", itemsInfos);

  const [features, setFeatures] = useState([]);

  //Transformation du tableau en points
  for(var j=0; j<items2.length; j++)
  {
    features[j] = new Feature({
        geometry: new Point(fromLonLat(items2[j])),
        name: itemsInfos[j],
        properties:items2[j],
    });
    features[j].setStyle(iconStyle);
  }

  console.log("features", features);

  var test=vector({features});

  function _handleRayonChange(e)
  {
    setRayon(e.target.value);
    console.log("Rayon:", rayon);
  }

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
        <h3>Résultats: {items.length} objets proches de votre localisation</h3>
        Dans un rayon de:
            <div onChange={_handleRayonChange}>
                <input type="radio" name="rayon" value="5" /> 5km
                <input type="radio" name="rayon" value="10" /> 10km
                <input type="radio" name="rayon" value="15" /> 15km
                <input type="radio" name="rayon" value="20" /> 20km
            </div>
      </Map>
    </div>
  );
};

export default MyMap;
