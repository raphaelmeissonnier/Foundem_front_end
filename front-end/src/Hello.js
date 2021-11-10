import React, { useRef, useState, useEffect, Text } from "react"
import MapContext from "./Map/MapContext";

const Hello = () => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
    const [itemsInfos, setItemsInfos] = useState([]);
    const [clicked, setCliked] = useState(false);

  return(
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
		</MapContext.Provider>  )
}

export default Hello;