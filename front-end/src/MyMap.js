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
import {FormControlLabel, FormLabel, Paper, Radio, RadioGroup} from '@material-ui/core';
import Stack from '@mui/material/Stack';



import "./App.css";
import SuggestionObjetPerdu from "./Components/SuggestionObjetPerdu";


const MyMap = (props) => {

  var longitude = props.longitude;
  console.log("longitude", longitude);
  var latitude = props.latitude;
  console.log("latitude", latitude);

  const center = [longitude,latitude];
  const zoom= 16;

  const [items, setItems] = useState([]);
  const [items2] = useState([]);
  const [itemsInfos] = useState([]);
  const [rayon, setRayon] = useState(100);
  const [features] = useState([]);
  const [changed, setChanged] = useState(1);

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
      //On récupère les objets perdus
      let response_perdu = await fetch("/objetsperdus/"+longitude+"/"+latitude+"/"+rayon);
      let data_perdu = await response_perdu.json();

      //On récupère les objets trouvés
      let response_trouve = await fetch("/objetstrouves/"+longitude+"/"+latitude+"/"+rayon);
      let data_trouve = await response_trouve.json();

      console.log("MyMap.js - data_perdu",data_perdu)
      console.log("MyMap.js - data_trouve",data_trouve);

      //Concaténation des tableaux d'objets trouvés et perdus
      var objets_concat = data_perdu.concat(data_trouve);
      console.log("MyMap.js - Objets_concat: ", objets_concat);
      setItems(objets_concat);
      console.log("MyMap.js - items: ", items);
      setChanged(changed+1);
    }
  }, [rayon]);

  //On vérifie que les données soient bien récupérées
  console.log("MyMap.js - items: ", items);

  useEffect( () =>{
      console.log("2ème UseEffect - On vide items2");
      items2.length=0;
      itemsInfos.length=0;
      features.length=0;
      for(var i=0; i<items.length;i++)
      {
          //console.log("2ème UseEffect - On remplit items2")
        items2[i] = [items[i][0].localisation.position.longitude, items[i][0].localisation.position.latitude];
        itemsInfos[i] = [items[i][0].categorie, items[i][0].intitule, items[i][0].description, items[i][0].date] ;
      }
      console.log("MyMap.js - Items2", items2);
      console.log("MyMap.js -ItemsInfos", itemsInfos);
      for(var j=0; j<items2.length; j++)
      {
        features[j] = new Feature({
            geometry: new Point(fromLonLat(items2[j])),
            name: itemsInfos[j],
            properties:items2[j],
        });
        features[j].setStyle(iconStyle);
      }
      console.log("MyMap.js - Features: ", features);

  }, [items])

  var test=vector({features});

  function _handleRayonChange(e)
  {
    setRayon(e.target.value);
    console.log("Rayon:", rayon);
  }

  const Item = styled(Paper)(({ theme }) => ({}));

  return (
      <div>
      <Stack direction="row" spacing={2} >
          <Item elevation={8} style={{width:'70%', marginLeft:'10px', marginRight:'10px', marginBottom:'10px', marginTop:'10px', textAlign:'center'}}>
              <FormLabel style={{color:'black', fontFamily:'Arvo', fontSize:20}}>Résultats: <b>{items.length}</b> objets proches de votre localisation</FormLabel>
              <Map center={fromLonLat(center)} zoom={zoom}>
                  <Layers>
                      <TileLayer source={osm()} zIndex={0} />
                      {features.length>0 && <VectorLayer source={cluster(test)} />}
                  </Layers>
                  <Controls>
                      <FullScreenControl />
                  </Controls>
              </Map>
              <div style={{flexDirection:"row", display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <FormLabel style={{color:'black', fontFamily:'Arvo', fontSize:20, marginRight:"5px"}}>Dans un rayon de</FormLabel>
                  <RadioGroup onChange={_handleRayonChange} value={rayon} row>
                      <FormControlLabel value="5" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="5km" />
                      <FormControlLabel value="10" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="10km" />
                      <FormControlLabel value="15" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="15km" />
                      <FormControlLabel value="20" style={{fontFamily:'Arvo', fontSize:20, color:'black'}} control={<Radio size="small" color="primary"/>} label="20km" />
                  </RadioGroup>
              </div>
          </Item>

          {longitude > 0 && latitude > 0 ? <SuggestionObjetPerdu longitude={longitude} latitude={latitude} /> : null }

      </Stack>

      </div>
  );
};

export default MyMap;
