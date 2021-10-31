import React, {useState, useRef, Label, useEffect} from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import {InputLabel, Paper, CssBaseline, Container, TextField, Select, Box, Button, IconButton, Grid, Radio, RadioGroup,
FormControl, FormControlLabel, FormLabel, Fab} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Geocoder from "react-mapbox-gl-geocoder"
const {config} = require('../config');

const mapboxApiKey = config.MY_API_TOKEN;

const params = {
  country: "fr"
}

const AjoutObjetTrouve = () => {

  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [categorie, setCategorie] = useState("");
  const [adresse, setAdresse] = useState("");
  const [resultat,setResultat]=useState("");
  const [viewport,setViewport]=useState("");
  const [item,setItem]=useState("Adresse");

  function envoyerInformations() {
    console.log("intitulé envoyé: ", intitule);
    console.log("description envoyé: ", description);
    console.log("date envoyé: ", date);
    console.log("longitude envoyé: ", longitude);
    console.log("latitude envoyé: ", latitude);
    console.log("adresseMail envoyé: ", adresseMail);
    console.log("categorie envoyé: ", categorie);

    if(!intitule || !description || !date || !longitude || !latitude || !adresseMail || !categorie){console.log("intitule:", intitule); return}
    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ intitule: intitule, description: description, date: date, longitude: parseInt(longitude), latitude: parseInt(latitude), adresseMail: adresseMail, categorie: categorie})
    };
    fetch('/ajoutObjetTrouve', requestOptions)
        .then(response => response.json());
  }

  function _handleIntituleChange(e){
    setIntitule(e.target.value);
    //console.log(e.target.value);
  }

  function _handleDescriptionChange(e){
    setDescription(e.target.value);
    //console.log("description", description);
  }

  function _handleDateChange(e){
    setDate(e.target.value);
    //console.log("date", date);
  }

  function _handleLongitudeChange(e){
    setLongitude(e.target.value);
    //console.log("longitude", longitude);
  }

  function _handleLatitudeChange(e){
    setLatitude(e.target.value);
    //console.log("latitude", latitude);
  }

  function _handleAdresseMailChange(e){
    setAdresseMail(e.target.value);
    //console.log("adresse mail", adresseMail);
  }

  function _handleCategorieChange(e){
    setCategorie(e.target.value);
    //console.log("categorie", categorie);
  }

  /*function _handleAdresseChange(e){
    geocoder.addTo(classes.geocoder);
    const results = document.getElementById('result');
    
    geocoder.on('result', (d) => {
      results.innerText = JSON.stringify(d.result, null, 2);
    })
    geocoder.on('clear', () => {
      results.innerText = '';
    });
  }*/

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const useStyles = makeStyles((theme) => ({
    root: {
          flexGrow: 1,
          minWidth: 275,
        },
    div: {
          alignItems: 'center',
    },
    grid: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          marginLeft: '70vh',
          alignItems: 'center',

        },
    title: {
          flexGrow: 1,
          alignItems: 'center',
          textAlign: 'center',

        },
    geocoder: {
          zIndex: 1,
          margin: '20px',
      },
    mapboxglctrlgeocoder: {
          minWidth: '100%',
      }

}));

function onSelected(viewport, item){
  setViewport(viewport)
  console.log("Item",item.place_name)
  console.log("Item",item)
  setLongitude(item.center[0])
  setLatitude(item.center[1])
  console.log("Item long",item.center[0])
}

const viewport2 = {
  width: 400,
  height: 400
};

const classes = useStyles();
  return(
    <div className={classes.div}>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className={classes.title}> Ajouter un objet trouvé </h1>
        <br></br>
        Intitulé: <input type="text" onChange={_handleIntituleChange}/>
        <br></br>
        Description: <input type="text" onChange={_handleDescriptionChange}/>
        <br></br>
        <div onChange={_handleCategorieChange}>
            <input type="radio" value="hightech" /> High-Tech
            <input type="radio" value="livres" /> Livres
            <input type="radio" value="beaute_sante" /> Beauté et santé
            <input type="radio" value="garde_robe" /> Garde-robe
            <input type="radio" value="cartes" /> Cartes
            <input type="radio" value="autres" /> Autres
        </div>
        Date: <input type="date" onChange={_handleDateChange}/>
        <br></br>
        Adresse mail: <input type="email" onChange={_handleAdresseMailChange}/>
        <br></br>
        Adresse: <Geocoder                
          mapboxApiAccessToken={mapboxApiKey}                                             
          hideOnSelect={true} 
          onSelected={onSelected} 
          viewport={viewport2} 
          updateInputOnSelect={true}
          initialInputValue=" "                    
          queryParams={params}            
        />
        <br></br>
        <Button onClick={envoyerInformations}>Ajouter</Button>
    </div>
  )
  //Attention ce morceau de code doit être mis dans la fonction return
/*
    <div className={classes.div}>
      <br></br><br></br><br></br><br></br><br></br>
      <h1 className={classes.title}> Ajouter un objet trouvé </h1>
      <FormControl>
        <Grid container spacing={2}>
            <Grid className={classes.grid} item xs={4}>
                <Item>
                    <TextField required id="intitule" label="Intitule" InputLabelProps={{ shrink: true,}} variant="standard" onChange={_handleIntituleChange}/>
                </Item>
                <Item>
                    <TextField required id="description" label="Description" InputLabelProps={{ shrink: true,}} variant="standard" onChange={_handleDescriptionChange}/>
                </Item>
                <Item>
                    <FormLabel component="legend">Categorie</FormLabel>
                    <RadioGroup row aria-label="categorie" name="categorie" onChange={_handleCategorieChange}>
                        <FormControlLabel value="hightech" control={<Radio />} label="High Tech" />
                        <FormControlLabel value="livres" control={<Radio />} label="Livres" />
                        <FormControlLabel value="four_bur" control={<Radio />} label="Fournitures de bureau" />
                        <FormControlLabel value="garde_robe" control={<Radio />} label="Garde-robe" />
                        <FormControlLabel value="beaute_sante" control={<Radio />} label="Beauté et santé" />
                        <FormControlLabel value="cartes" control={<Radio />} label="Cartes" />
                        <FormControlLabel value="autres" control={<Radio />} label="Autres" />
                    </RadioGroup>
                </Item>
                <Item>
                    <TextField required id="date" label="Date" InputLabelProps={{ shrink: true,}} type="date" variant="standard" onChange={_handleDateChange}/>
                </Item>
                <Item>
                    <TextField required id="longitude" label="longitude" InputLabelProps={{ shrink: true,}} variant="standard" onChange={_handleLongitudeChange}/>
                </Item>
                <Item>
                    <TextField required id="latitude" label="latitude" InputLabelProps={{ shrink: true,}} variant="standard" onChange={_handleLatitudeChange}/>
                </Item>
                <Item>
                    <TextField required id="email" label="Adresse email" InputLabelProps={{ shrink: true,}} variant="standard" onChange={_handleAdresseMailChange}/>
                </Item>
                <Item>
                    <Fab variant="extended" color="#5fa082" aria-label="add">
                        <NavigationIcon sx={{ mr: 1 }} />
                            <Button onClick={envoyerInformations}>Ajouter</Button>
                    </Fab>
                </Item>
            </Grid>
        </Grid>
      </FormControl>
    </div>*/

}

export default AjoutObjetTrouve;