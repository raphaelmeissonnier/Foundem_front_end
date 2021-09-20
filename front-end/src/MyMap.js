import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as OlLayer from "ol/layer";
import * as OlSource from "ol/source";
import * as OlStyle from "ol/style";
import OlGeomPoint from "ol/geom/Point";
import OlFeature from "ol/Feature";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import { fromLonLat } from 'ol/proj';
import marker from './images/marker.png';

var upn_loc=fromLonLat([2.21367,48.9036]);
var map;

class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: fromLonLat([2.21367,48.9036]),
        zoom: 16 
    };

    map = new OlMap({
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

  updateMap() {
    map.getView().setCenter(this.state.center);
    map.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    map.setTarget("map");

    // Listen to map changes
    map.on("moveend", () => {
      let center = map.getView().getCenter();
      let zoom = map.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = map.getView().getCenter();
    let zoom = map.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    map = new OlMap({
        target: 'map',
        layers: [
          new OlLayerTile({
            source: new OlSourceOSM()
          })
        ],
        view: new OlView({
          center: upn_loc ,
          zoom: 20
        })
    });
  }
  
  render() {
    this.updateMap(); // Update map on render?
    return (
    
      <div id="map" style={{ width: "100%", height: "450px" }}>
      </div>
    );
  }
  
}


export default PublicMap;