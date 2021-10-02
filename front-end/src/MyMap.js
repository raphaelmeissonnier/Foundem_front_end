import React, { useState,useEffect } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";

import mapConfig from "./config.json";
import "./App.css";


function addMarkers(lonLatArray) {
  
  console.log("Dans AddMarker",lonLatArray)

  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const MyMap = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(16);

  let [items, setItems] = useState([]);
  let [items2, setItems2] = useState([]);
  var result= []

  
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('/objets')
      response = await response.json()
      setItems(response)
    }

    fetchMyAPI()
  }, [])


  const [showMarker, setShowMarker] = useState(true);

  const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

  for(var i=0; i<items.length;i++){
    items2[i] = [items[i].localisation.longitude,items[i].localisation.latitude]
  }

  console.log("Items2", items2)
  console.log("MarkerLonLat", markersLonLat)

  const [features, setFeatures] = useState(addMarkers(items2));

  
  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showMarker && <VectorLayer source={vector({ features })} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default MyMap;
