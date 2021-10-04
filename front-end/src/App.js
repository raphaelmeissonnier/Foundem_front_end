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
}

  render() {
  this.getLocation();
    return (
      <div className="App">
        <h2>
          React Geolocation
        </h2>
        <button onClick={this.envoyerLocalisation}>Centrer</button>
      </div>
    )
  }
}

export default App;
