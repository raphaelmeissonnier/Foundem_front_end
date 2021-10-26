import { numberSafeCompareFunction } from "ol/array";
import React, { Component, Text } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Router } from "@material-ui/icons";
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import MyMap from "../MyMap";
import App from "../App";
import Ajout_objT from './AjoutObjetTrouve';
import Header from './Header';




class Accueil extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };

    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this)
  }

  getLocation(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    }
    else{
      alert("La géolocalisation n'est pas supportée par votre navigateur");
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })


  }

  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.position_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      default:
      alert("An unknow error occurred.")
    }
  }

envoyerLocalisation = () =>
{
    if(!this.state) { return }

    //console.log("Longitute", this.state.longitude);
    //const {longitude} = this.state.longitude;

    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ longitude: this.state.longitude, latitude: this.state.latitude})
    };
    fetch('/localisation', requestOptions)
        .then(response => response.json());

    window.location.reload(false);
}

  render() {
  this.getLocation();
    return (
      <div className="App">
      <Header/>
<br></br><br></br><br></br><br></br><br></br>

<div>
<h1> Un objet perdu se transforme souvent en objet trouvé ! </h1>
<h5> Vous avez perdu ou trouvé un objet ? Déclarez-le et la communauté
se met en mouvement pour vous aider à retrouver votre objet </h5>
 <box direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<SearchIcon />}>
        J'ai perdu un objet
      </Button>
      <Button variant="contained" endIcon={<AddIcon />}>
        J'ai trouvé un objet
      </Button>
    </box>
</div>
        <button onClick={this.envoyerLocalisation}>Centrer</button>
        {this.state.longitude > 0 && this.state.latitude > 0 ? (<MyMap longitude={this.state.longitude} latitude={this.state.latitude}/> ) : null }
      </div>
    )
  }
}

export default Accueil;
