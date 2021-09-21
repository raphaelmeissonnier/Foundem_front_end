import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as OlLayer from "ol/layer";
import * as OlSource from "ol/source";
import * as OlStyle from "ol/style";
import OlGeomPoint from "ol/geom/Point";
import OlGeomCircle from "ol/geom/Circle";
import { transform } from "ol/proj"
import OlFeature from "ol/Feature";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import { fromLonLat } from 'ol/proj';
import marker from './images/marker.svg';

const upn_loc=fromLonLat([2.21367,48.9036]); //position de l'université de paris nanterre

class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: upn_loc,
        zoom: 16 
    };

    this.map = new OlMap({ //creation de la map
      target: null,
      layers: [
        new OlLayerTile({
          source: new OlSourceOSM()
        })
      ],
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() { //mise à jour de la map
    this.map.getView().setCenter(this.state.center);
    this.map.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.map.setTarget("map");
    // Geometries
    var point = new OlGeomPoint(
      transform([2.21367,48.9036], 'EPSG:4326', 'EPSG:3857')
    );
    var circle = new OlGeomCircle(
      transform([2.21367,48.9036], 'EPSG:4326', 'EPSG:3857'),
      100
    );

    // Features
    var pointFeature = new OlFeature(point);
    var circleFeature = new OlFeature(circle);

    // Source
    var vectorSource = new OlSource.Vector({
      projection: 'EPSG:4326'
    });
    vectorSource.addFeatures([pointFeature, circleFeature]);

    var iconStyle = new OlStyle.Style({
      image: new OlStyle.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        opacity: 0.75,
        scale: 1,
        src: marker
      }))
    });

    // Vector layer
    var vectorLayer = new OlLayer.Vector({
    source: vectorSource,
    style: iconStyle
    });

    // Add Vector layer to map
    this.map.addLayer(vectorLayer);

    // Listen to map changes
    this.map.on("moveend", () => {
      let center = this.map.getView().getCenter();
      let zoom = this.map.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.map.getView().getCenter();
    let zoom = this.map.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }
  
  render() { //rendu de la map, taille etc...
    this.updateMap(); // Update map on render?
    return (
    
      <div id="map" style={{ width: "100%", height: "450px" }}> 
      </div>
    );
  }
  
}


export default PublicMap;