import React, {useState, useRef, Label} from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import {InputLabel, Paper, CssBaseline, Container, TextField, Select, Box, Button, IconButton, Grid, Radio, RadioGroup,
FormControl, FormControlLabel, FormLabel, Fab} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Accueil from '../Components/Accueil';
import Header from './Header';


const ChercherObjetPerdu = () => {

  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [categorie, setCategorie] = useState("");
  const [items, setItems] = useState([]);


  function envoyerInformations() {
    //if(!intitule || !description || !date || !categorie){console.log("Envoyer Infos categorie:", categorie); return}
    console.log("avant fetch envoyerInfos")
    let response= fetch('/chercherObjetPerdu/'+intitule+'/'+categorie+'/'+date)
        .then(response => response.json());
    let data = response.json();
    setItems(data);
  }

  function _handleIntituleChange(e){
    setIntitule(e.target.value);
    console.log(intitule);
  }

  function _handleDescriptionChange(e){
    setDescription(e.target.value);
    console.log("description", description);
  }

  function _handleDateChange(e){
    setDate(e.target.value);
    console.log("date", date);
  }

  function _handleAdresseMailChange(e){
    setAdresseMail(e.target.value);
    console.log("adresse mail", adresseMail);
  }

  function _handleCategorieChange(e){
    setCategorie(e.target.value);
    console.log("categorie", categorie);
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

}));
const classes = useStyles();
  return(
    <div className={classes.div}>
        <Header/>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className={classes.title}> Rechercher un objet perdu </h1>
        <br></br>
        <p>Merci de renseigner un maximum de champs pour pouvoir vous afficher les articles les plus proches de votre description</p>
        <br></br>
        Intitulé: <input type="text" onChange={_handleIntituleChange}/>
        <br></br>
        <div onChange={_handleCategorieChange}>
            <input type="radio" value="hightech" /> High-Tech
            <input type="radio" value="livres" /> Livres
            <input type="radio" value="beaute_sante" /> Beauté et santé
            <input type="radio" value="garde_robe" /> Garde-robe
            <input type="radio" value="cartes" /> Cartes
            <input type="radio" value="autres" /> Autres
        </div>
        <br></br>
        Date: <input type="date" onChange={_handleDateChange}/>
        <br></br>
        <Button onClick={envoyerInformations}>RECHERCHER</Button>
        <div>
          <table>
            <thead>
            <tr>
              <th>Intitulé</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            </tbody>
          </table>
        </div>
    </div>
  )

}

export default ChercherObjetPerdu;