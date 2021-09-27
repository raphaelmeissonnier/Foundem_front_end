import { numberSafeCompareFunction } from "ol/array";
import React, { Component, Text } from "react";


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
      <div className="App">

        <h2>
          React Geolocation
        </h2>

        <button onClick={this.getLocation}> Obtenir coordonnées</button>
        <h4>Coordonnées de l'utilisateur</h4>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
      </div>
    )
  }


}



export default App;