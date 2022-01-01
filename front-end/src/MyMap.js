import React, { useState,useEffect } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector,cluster } from "./Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";
import marker from "./images/marker.svg"
import { styled } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core';
import Stack from '@mui/material/Stack';



import "./App.css";
import SuggestionObjetPerdu from "./Components/SuggestionObjetPerdu";


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
  const [rayon, setRayon] = useState(100);
  const [features, setFeatures] = useState([]);

  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: marker,
    }),
  });

  //Au chargement de la page, on récupère les objets perdus et trouvés depuis le back
  useEffect(async () => {
    if(longitude && latitude && rayon){
      console.log("rayon envoyé", rayon)
      //On récupère les objets perdus
      //let response_perdu = await fetch("/objetsperdus/"+longitude+"/"+latitude+"/900");
      let response_perdu = await fetch("/objetsperdus/"+longitude+"/"+latitude+"/"+rayon);
      let data_perdu = await response_perdu.json();
      //On récupère les objets trouvés
      //let response_trouve = await fetch("/objetstrouves/"+longitude+"/"+latitude+"/900");
      let response_trouve = await fetch("/objetstrouves/"+longitude+"/"+latitude+"/"+rayon);
      let data_trouve = await response_trouve.json();
      console.log("apres le fetch perdu dans MYMAP",data_perdu)
      console.log("####################################################")
      console.log("apres le fetch trouve dans MYMAP",data_trouve);
      //Concaténation des tableaux d'objets trouvés et perdus
      var objets_concat = data_perdu.concat(data_trouve);
      console.log("Objets_concat: ", objets_concat);
      setItems(objets_concat);
    }
  }, [rayon]);

  //On vérifie que les données soient bien récupérées
  console.log("Items", items);

  useEffect( () =>{
      if(items.length <=0)
      {
        setItems2([]);
        setItemsInfos([]);
        setFeatures([])
      }
      else
      {
          for(var i=0; i<items.length;i++)
          {
            items2[i] = [items[i][0].localisation.position.longitude, items[i][0].localisation.position.latitude];
            itemsInfos[i] = [items[i][0].categorie, items[i][0].intitule, items[i][0].description, items[i][0].date] ;
          }
          for(var j=0; j<items2.length; j++)
          {
            features[j] = new Feature({
                geometry: new Point(fromLonLat(items2[j])),
                name: itemsInfos[j],
                properties:items2[j],
            });
            features[j].setStyle(iconStyle);
          }
      }
  }, [items])

  console.log("Items2", items2);
  console.log("ItemsInfos", itemsInfos);
  console.log("features", features);

  var test=vector({features});

  function _handleRayonChange(e)
  {
    setRayon(e.target.value);
    console.log("Rayon:", rayon);
  }

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  border: 'none'
}));

  return (
    <Stack direction="row" spacing={2}>
     <Item>
          <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
              <TileLayer source={osm()} zIndex={0} />
              {features.length>0 && <VectorLayer source={cluster(test)} />}
            </Layers>
            <Controls>
              <FullScreenControl />
            </Controls>

          </Map>
          </Item>

            <Item>
      <h3>Résultats: {items.length} objets proches de votre localisation</h3>
        Dans un rayon de:
            <div onChange={_handleRayonChange}>
                <input type="radio" name="rayon" value="5" /> 5km
                <input type="radio" name="rayon" value="10" /> 10km
                <input type="radio" name="rayon" value="15" /> 15km
                <input type="radio" name="rayon" value="20" /> 20km
            </div>
       </Item>
        <Item>
      <br></br>
      {longitude > 0 && latitude > 0 ? (<SuggestionObjetPerdu longitude={longitude} latitude={latitude} /> ) : null }
      </Item>
      </Stack>

  );
};

export default MyMap;
