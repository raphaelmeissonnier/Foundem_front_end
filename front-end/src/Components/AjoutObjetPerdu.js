import React, {useState} from 'react';
import { Paper, Select, Button } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './ajoutObjetTrouve.css'
import Geocoder from "react-mapbox-gl-geocoder"
const {config} = require('../config');


const mapboxApiKey = config.MY_API_TOKEN;

const params = {
  country: "fr"
}

const AjoutObjetPerdu = () => {

  const [intitule, setIntitule] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [adresseMail, setAdresseMail] = useState();
  const [categorie, setCategorie] = useState();
  const [rayon, setRayon]=useState();

  /* Cette fonction envoyer les infos du formulaire au back
  */
  function envoyerInformations() {

    console.log("intitulé envoyé: ", intitule);
    console.log("description envoyé: ", description);
    console.log("date envoyé: ", date);
    console.log("longitude envoyé: ", longitude);
    console.log("latitude envoyé: ", latitude);
    console.log("adresseMail envoyé: ", adresseMail);
    console.log("categorie envoyé: ", categorie);
    console.log("rayon envoyé: ", rayon);

    /*Si un des champs n'a pas été saisi,
    l'utlisateur est averti par une pop-up
    */
    if(!intitule || !description || !date || !longitude || !latitude || !adresseMail || !categorie || !rayon)
    {
        window.alert("Veuillez saisir tous les champs du formulaire !");
        return;
    }
    //Si tous les champs ont été saisis alors appel de l'API
    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({intitule: intitule, description: description, date: date, longitude: longitude, latitude: latitude, adresseMail: adresseMail, categorie: categorie, rayon: parseInt(rayon)})
    };
    fetch('/objetsperdus', requestOptions)
        .then(response => response.json());
    console.log("AjoutObjetPerdu: ", )
  }

  //Récupération de valeur du champs 'Intitulé'
  function _handleIntituleChange(e){
    setIntitule(e.target.value);
  }

  //Récupération de valeur du champs 'Description'
  function _handleDescriptionChange(e){
    setDescription(e.target.value);
  }

  //Récupération de valeur du champs 'Date'
  function _handleDateChange(e){
    setDate(e.target.value);
  }

  //Récupération de valeur du champs 'Adresse mail'
  function _handleAdresseMailChange(e){
    setAdresseMail(e.target.value);
  }

  //Récupération de valeur du champs 'Date'
  function _handleCategorieChange(e){
    setCategorie(e.target.value);
  }

  //Récupération de valeur du champs 'Rayon'
  function _handleRayonChange(e){
    setRayon(e.target.value);
  }

  //Récupération de la longitude et latitude à partir de l'adresse
  function onSelected(viewport, item){
    console.log("Item",item.place_name)
    console.log("Item",item)
    setLongitude(item.center[0])
    setLatitude(item.center[1])
    console.log("Item long",typeof(item.center[0]))
  }

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

const viewport2 = {
  width: 400,
  height: 400
};

const classes = useStyles();
  return(
    <div className={classes.div}>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className={classes.title}> Ajouter un objet perdu </h1>
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
        Dans un rayon de:
        <div onChange={_handleRayonChange}>
            <input type="radio" value="5" /> 5km
            <input type="radio" value="10" /> 10km
            <input type="radio" value="15" /> 15km
            <input type="radio" value="20" /> 20km
        </div>
        <Button onClick={envoyerInformations}>Ajouter</Button>
    </div>
  )
}

export default AjoutObjetPerdu;