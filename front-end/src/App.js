import React from "react";
import {CircularProgress, Button} from '@material-ui/core';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Alert } from "@mui/material";
import Map from "./MapboxMap/Map";

class App extends React.Component {

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
      <div>
        {this.state.longitude > 0 && this.state.latitude > 0 ?
            <div>
              <Map longitude={this.state.longitude} latitude={this.state.latitude}/>
            </div>
            :
            <div style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <CircularProgress/>
              <Alert severity="info"
                     style={{alignContent: 'center', justifyContent: 'center', marginTop: '5px'}}
              >
                Veuillez patienter le chargement peut prendre quelques instants...
              </Alert>
            </div>
        }
      </div>
    )
  }
}

export default App;
