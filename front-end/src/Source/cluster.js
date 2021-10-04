import * as olSource from "ol/source";
//import vector from "./vector"

function cluster(features) {
	return new olSource.Cluster({
        source: features,
        distance: 25,
        minDistance: 25
    });
}

export default cluster;