import { numberSafeCompareFunction } from "ol/array";
import React, { Component, Text } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Router } from "@material-ui/icons";
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Ajout_objT from '../Components/ajout_objT';
import App from "../App";





class Principale extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    };

    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this)
  }

  getLocation(){
    if (navigator.geolocation) {
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



  render() {

    

    return (
      
      <div style={{textAlign:'center', backgroundColor:'#ceaec3'}}>


          <div>
              <h2>
                React Geolocation
            </h2>

            <Button onClick={this.getLocation} variant="contained"> Obtenir coordonnées</Button>
            <h4>Coordonnées de l'utilisateur</h4>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
            <p>Adresse: {this.state.userAddress}</p>
            <Link to ='/ajout_objT' > Ajouter </Link>

          </div>
       </div>
       
    )
  }


}



export default Principale;