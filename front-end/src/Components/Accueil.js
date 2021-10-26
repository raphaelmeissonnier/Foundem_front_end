import { numberSafeCompareFunction } from "ol/array";
import React, { Component, Text } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Router } from "@material-ui/icons";
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AjoutObjetTrouve from './AjoutObjetTrouve';
import Header from './Header';
import history from '../Routes/History'

class Accueil extends React.Component {
  rediriger = () => {
    history.push('/AjoutObjetTrouve');
    console.log("J'ai cliqué");
  }
  render() {
    return (
      <div className="Accueil">
        <Header/>
        <br></br><br></br><br></br><br></br><br></br>
          <div>
            <h1> Un objet perdu se transforme souvent en objet trouvé ! </h1>
            <h5> Vous avez perdu ou trouvé un objet ? Déclarez-le et la communauté
            se met en mouvement pour vous aider à retrouver votre objet </h5>
            <box direction="row" spacing={2}>
                <Button variant="contained" endIcon={<AddIcon />} onClick={this.rediriger}>
                    J'ai trouvé un objet
                </Button>
            </box>
          </div>
        </div>
    )
  }
}

export default Accueil;
