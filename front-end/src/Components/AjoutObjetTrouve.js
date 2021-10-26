import React, {useState, useRef, Label} from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import {InputLabel, Paper, CssBaseline, Container, TextField, Select, Box, Button, IconButton, Grid, Radio, RadioGroup,
FormControl, FormControlLabel, FormLabel, Fab} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Accueil from '../Components/Accueil';
import Header from './Header';


const AjoutObjetTrouve = () => {

  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [categorie, setCategorie] = useState("");

  function envoyerInformations() {
    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ intitule: intitule, description: description, date: date, longitude: longitude, latitude: latitude, adresseMail: adresseMail, categorie: categorie})
    };
        fetch('/ajoutObjetTrouve', requestOptions)
            .then(response => response.json());
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

  function _handleLongitudeChange(e){
    setLongitude(e.target.value);
    console.log("longitude", longitude);
  }

  function _handleLatitudeChange(e){
    setLatitude(e.target.value);
    console.log("latitude", latitude);
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
        <h1 className={classes.title}> Ajouter un objet trouvé </h1>
        <br></br>
        Intitulé: <input type="text" onChange={_handleIntituleChange}/>
        <br></br>
        Description: <input type="text" onChange={_handleDescriptionChange}/>
        <br></br>
        Catégorie: <input type="text" onChange={_handleCategorieChange}/>
        <br></br>
        Date: <input type="date" onChange={_handleDateChange}/>
        <br></br>
        Longitude: <input type="number" onChange={_handleLongitudeChange}/>
        <br></br>
        Latitude: <input type="number" onChange={_handleLatitudeChange}/>
        <br></br>
        Adresse mail: <input type="email" onChange={_handleAdresseMailChange}/>
        <br></br>
        <Button onClick={envoyerInformations}>Ajouter</Button>
    </div>
  )
  /*<FormControl>
  <Grid container spacing={2}>
   <Grid className={classes.grid} item xs={4}>
      <Item>
      <input type="text" onChange={_handleIntituleChange}/>
      <TextField required id="intitule" label="Intitule" InputLabelProps={{ shrink: true,}} variant="standard" inputRef={intituleRef}/>
      </Item>
      <Item>
      <TextField required id="description" label="Description" InputLabelProps={{ shrink: true,}} variant="standard" onChange={_handleDescriptionChange}/>
      </Item>
      <Item>
       <FormLabel component="legend">Categorie</FormLabel>
            <RadioGroup row aria-label="categorie" name="categorie">
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
       <TextField id="telephone" label="Numéro de téléphone" InputLabelProps={{ shrink: true,}} variant="standard"/>
       </Item>
      <Item>
      <Fab variant="extended" color="#5fa082" aria-label="add">
              <NavigationIcon sx={{ mr: 1 }} />
              <Button onClick={envoyerInformations}>Ajouter</Button>
            </Fab>
      </Item>
   </Grid>
    </Grid>
   </FormControl>*/

}

export default AjoutObjetTrouve;