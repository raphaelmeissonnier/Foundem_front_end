import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
    const [itemsInfos, setItemsInfos] = useState([]);
    const [clicked, setCliked] = useState(false);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);

        mapObject.on('click', (event) => {
              const features = mapObject.forEachFeatureAtPixel(event.pixel, (feature) => {
                return feature;
              });
              if (features) {
                  setCliked(true);
                  setItemsInfos(features.getProperties().features[0].values_.name);
                  console.log("feature", features.getProperties().features[0].values_.name)
              }
        });

		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
			{clicked ? (
			    <div>
                    Catégorie: {itemsInfos[0]}
                    <br></br>
                    Intitulé: {itemsInfos[1]}
                    <br></br>
                    Description: {itemsInfos[2]}
                </div>
			    )
			    :null
			}
		</MapContext.Provider>
	)
}

export default Map;