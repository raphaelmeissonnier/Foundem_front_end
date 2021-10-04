import * as olSource from "ol/source";
//import vector from "./vector"

function cluster(features) {
	return new olSource.Cluster({
        source: features,
        distance: 1000,
        minDistance: 1000
    });
}

export default cluster;