import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import {InputLabel, Paper, CssBaseline, Container, TextField, Select, Box, Button, IconButton, Grid, Radio, RadioGroup,
FormControl, FormControlLabel, FormLabel, Fab} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import Accueil from '../Components/Accueil';
import Header from './Header';


function AjoutObjetTrouve() {

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
<FormControl>
<Grid container spacing={2}>
 <Grid className={classes.grid} item xs={4}>
    <Item>
    <TextField required id="intitule" label="Intitule" InputLabelProps={{ shrink: true,}} variant="standard"/>
    </Item>
    <Item>
    <TextField required id="description" label="Description" InputLabelProps={{ shrink: true,}} variant="standard"/>
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
    <TextField required id="date" label="Date" InputLabelProps={{ shrink: true,}} type="date" variant="standard"/>
    </Item>
    <Item>
    <TextField required id="longitude" label="longitude" InputLabelProps={{ shrink: true,}} variant="standard"/>
    </Item>
    <Item>
    <TextField required id="latitude" label="latitude" InputLabelProps={{ shrink: true,}} variant="standard"/>
    </Item>
     <Item>
     <TextField required id="email" label="Adresse email" InputLabelProps={{ shrink: true,}} variant="standard"/>
     <TextField id="telephone" label="Numéro de téléphone" InputLabelProps={{ shrink: true,}} variant="standard"/>
     </Item>
    <Item>
    <Fab variant="extended" color="#5fa082" aria-label="add">
            <NavigationIcon sx={{ mr: 1 }} />
            Ajouter
          </Fab>
    </Item>
 </Grid>
  </Grid>
 </FormControl>
    </div>

  )
}

export default AjoutObjetTrouve;