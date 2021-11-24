import React, { useState } from 'react';
import { Paper, Select, Button } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './ajoutObjetTrouve.css'
const {config} = require('../config');

var sanitizeHtml = require('sanitize-html');

const Inscription = () => {

    const[Pseudo, setPseudo] = useState();
    const[Motdepasse, setMotdepasse] = useState();
}

/* Cette fonction envoye les infos dans le back
*/

function envoyerInscription(){

    console.log("pseudo envoyé: ", pseudo);
    console.log("Motdepasse envoyé: ", Motdepasse);



/* Si un des champs n'a pas été saisi, l'utilisateur est averti
*/

if(!pseudo || !Motdepasse ){
    window.alert("Veuillez saisir tous les champs du formulaire !");
    return;
}

/* Si tous les champs ont été saisis alors on appelle l'API
*/

const requestOptions = {
    port:3001,
    method: 'POST',
    header: { 'Content-type' : 'application/json'},
    body: JSON.stringify({intitule: sanitizeHtml(pseudo), Motdepasse: sanitizeHtml(Motdepasse) })

};

fetch('/Inscription', requestOptions)
.then(response => response.json());
}

// Récupération de valeur du champs 'Pseudo'
function _handlePseudoChange(e){
    setPseudo(e.target.value);
}

// Récupération de valeur du champs 'Motdepasse'
function _handleMotdepasse(e){
    setMotdepasse(e.target.value);
}

const classes = useStyles();
  return(
    <div className={classes.div}>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className={classes.title}> Inscription </h1>
        <br></br>
        Pseudo: <input type="text" onChange={_handlePseudoChange}/>
        <br></br>
        Motdepasse: <input type="text" onChange={_handleMotdepasseChange}/>
        <br></br>
        <Button onClick={envoyerInformations}>S'inscrire</Button>
    </div>
  )
export default Inscription;

