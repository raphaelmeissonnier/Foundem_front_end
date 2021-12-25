import { numberSafeCompareFunction } from "ol/array";
import React, { Component, Text } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Card,
CardMedia, CardActions, CardContent} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AjoutObjetTrouve from './AjoutObjetTrouve';

import Fond from '../images/fond.jpg';

import {Link} from "react-router-dom";


const Accueil = () => {
    return (
    <div className="Accueil">
              <div style={{ backgroundImage : `url(${Fond})` , height : 400}}>
                <br></br><br></br><br></br><br></br><br></br>
               <br></br><br></br><br></br><br></br><br></br>





                <h1 style={{ color: '#009688', fontSize:30, fontVariant: 'small-caps'}}> Un objet perdu se transforme souvent en objet trouvé ! </h1>
                <h5 style={{ textAlign: 'left', marginLeft: 300, fontSize:20, fontVariant: 'small-caps'}}> Vous avez perdu ou trouvé un objet ? <br/>
                 Déclarez-le et la communauté se met en mouvement <br/>
                  pour vous aider à retrouver votre objet </h5>
                <box direction="row" spacing={2}>

                </box>
              </div>
          </div>




    )
}

export default Accueil;