import React, {useState, useRef, Label} from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import {InputLabel, Paper, CssBaseline, Container, TextField, Select, Box, Button, IconButton, Grid, Radio, RadioGroup,
FormControl, FormControlLabel, FormLabel, Fab} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Accueil from '../Components/Accueil';
import Header from './Header';
import Hightech from  '../images/Hightech.png';
import Livres from  '../images/Livres.png';
import Garderobe from  '../images/Garderobe.png';
import Cartes from  '../images/Cartes.png';
import Beauteetsante from  '../images/Beauteetsante.png';
import Autres from  '../images/Autres.png';
import Geocoder from "react-mapbox-gl-geocoder"

const {config} = require('../config');

const mapboxApiKey = config.MY_API_TOKEN;

const params = {
  country: "fr"
}

const ChercherObjetPerdu = () => {

  const [intitule, setIntitule] = useState("");
  const [date, setDate] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [categorie, setCategorie] = useState("");
  const [items, setItems] = useState([]);
  const [viewport,setViewport]=useState("");
  const [idObjet, setIdObjet]=useState(null);


  async function envoyerInformations() {
    if(!intitule || !date || !longitude || !latitude || !categorie){console.log("intitule:", intitule); return}
    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ intitule: intitule, date: date, longitude: longitude, latitude: latitude, categorie: categorie})
    };
    let response = await fetch('/objetstrouves/recherche', requestOptions);
    let data = await response.json();
    setItems(data);
  }

  function afficher()
  {
      var renderObjets = [];
      for(var i =0; i < items.length; i++){
          renderObjets.push(
              <div className="list-item" key={items[i][0].id}>
                  <li>{items[i][0].intitule}</li>
                  <li>{items[i][0].description}</li>
                  <li>{items[i][0].categorie}</li>
                  <li>{items[i][0].date}</li>
                  {/*<button onClick={() => console.log("Id depuis button: ", items[i][0].id)}>C'est mon objet</button>{/*TOUS LES ID DE PRIS */}
                  <Link to={{pathname: '/ObjetsMatche/'+items[i][0].id }}><button >Remove</button></Link>
              </div>
          );
      }
      return renderObjets;
  }

  function handleRemove(e)
  {
      if(e)
      {
          setIdObjet(e.target.value);
      }
  }

  function _handleIntituleChange(e){
    setIntitule(e.target.value);
    console.log(intitule);
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

function onSelected(viewport, item){
  setViewport(viewport)
  console.log("Item",item.place_name)
  console.log("Item",item)
  setLongitude(item.center[0])
  setLatitude(item.center[1])
  console.log("Item long",typeof(item.center[0]))
}

const viewport2 = {
  width: 400,
  height: 400
};

const classes = useStyles();
  return(
    <div className={classes.div}  >
        <Header/>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className={classes.title} > Rechercher un objet perdu </h1>
        <br></br>
        <center>
        <p>Merci de renseigner un maximum de champs pour pouvoir vous afficher les articles les plus proches de votre description !</p>
        </center>
        <br></br>

        <TextField type="text" onChange={_handleIntituleChange}
         helperText="Pour trouver votre objet, il nous faut son intitulé !"
         id="demo-helper-text-aligned"
         style={{
          marginLeft: "50px",
          marginBottom: "20px"
        }}
        label="Intitulé"/>

        <br></br>

        <br></br>
        <div onChange={_handleCategorieChange}>
                    <input type="radio" value="High-Tech"/> High-Tech
                    <input type="radio" value="livres" /> Livres
                    <input type="radio" value="beaute_sante" /> Beauté et santé
                    <input type="radio" value="Garde-Robe" /> Garde-robe
                    <input type="radio" value="cartes" /> Cartes
                    <input type="radio" value="Autres" /> Autres
        {/*<input type="radio" value="hightech" />
        <img src={Hightech} width="70" height="70"  style={{marginLeft: "50px", fontSize:"10px"}}/>

        <input type="radio" value="livres" />
        <img src={Hightech} width="70" height="70"  style={{marginLeft: "50px", fontSize:"10px"}}/>

        <input type="radio" value="beaute_sante" />
        <img src={Beauteetsante} width="70" height="70" alt="" input type="img" style={{marginLeft: "20px"}} value="Beauteetsante"/>

        <input type="radio" value="garde_robe" />
        <img src={Garderobe} width="70" height="70" alt="" input type="img" style={{marginLeft: "20px"}} value="Garderobe"/>

        <input type="radio" value="cartes" />
        <img src={Cartes} width="70" height="70" alt="" input type="img" style={{marginLeft: "20px"}} value="Cartes"/>

        <input type="radio" value="autres" />
        <img src={Autres} width="70" height="70" alt="" input type="img" style={{marginLeft: "20px"}} value="Autres"/>*/}
        </div>
        <br></br>
        Date: <input type="date" onChange={_handleDateChange}/>
        <br></br>
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

        <br></br>

    <center>
    <Button onClick={envoyerInformations}
    style={{
        borderRadius: 2,
        backgroundColor: "#5fa082",
        padding: "5px 20px",
        fontSize: "15px"
    }}
    variant="contained"
    >
    Rechercher
    </Button>
    </center>
    <br></br>

       <center>
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
        </center>

        <div>
            {items.length ? afficher() : null}
            {/*{items[0][0].date}*/}
            {/*{items.map(station => <div key={station}> {station} </div>)}*/}
        </div>

        {/*{[...items.keys()].map(k => (
            <li key={k}>items.get(k)</li>
        ))}*/}

        {/*{items.map((obj) => <li>{obj}</li>)}*/}
    </div>

  )

}

export default ChercherObjetPerdu;