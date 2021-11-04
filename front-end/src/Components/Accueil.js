import { numberSafeCompareFunction } from "ol/array";
import React, { Component, Text } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AjoutObjetTrouve from './AjoutObjetTrouve';
import {Link} from "react-router-dom";


const Accueil = () => {
    return (
      <div className="Accueil">
          <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h1> Un objet perdu se transforme souvent en objet trouvé ! </h1>
            <h5> Vous avez perdu ou trouvé un objet ? Déclarez-le et la communauté
            se met en mouvement pour vous aider à retrouver votre objet </h5>
            <box direction="row" spacing={2}>
            <Link to="/AjoutObjetTrouve"><Button variant="outlined"  style={{
        borderRadius: 2,
        backgroundColor: "#5fa082",
        padding: "5px 20px",
        fontSize: "15px"
    }}
    variant="contained">J'ai trouvé un objet</Button></Link>

    <Link to="/ChercherObjetPerdu"><Button variant="outlined"  style={{
        borderRadius: 2,
        backgroundColor: "#6eba97",
        padding: "5px 20px",
        fontSize: "15px"
    }}
    variant="contained">Je recherche un objet</Button></Link>
  
            </box>
          </div>
      </div>
    )
}

export default Accueil;