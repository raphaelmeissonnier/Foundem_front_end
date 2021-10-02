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

  useEffect(() => {
    fetch("/objets")
      .then(response => response.json())
      .then(data => setItems(data))
  }, []);

  console.log("Tab,", items[0].localisation);

  const [showMarker, setShowMarker] = useState(true);
  const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];


  const [features, setFeatures] = useState(addMarkers(markersLonLat));

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