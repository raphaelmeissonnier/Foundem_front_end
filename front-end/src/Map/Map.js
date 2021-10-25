import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
    const [itemsInfos, setItemsInfos] = useState();

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
              const feature = mapObject.forEachFeatureAtPixel(event.pixel, (feature) => {
                return feature;
              });
              if (feature) {
                  setItemsInfos(feature.getProperties().features[0].values_.name);
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
			<div>
			    {itemsInfos}
			</div>
		</MapContext.Provider>
	)
}

export default Map;