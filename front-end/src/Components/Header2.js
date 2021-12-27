import React, { Component, Fragment, useState } from 'react';
import clsx from 'clsx';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import { makeStyles, styled } from '@material-ui/core/styles';
import {AppBar, Box, Toolbar, Typography, Button, IconButton, Card, CardContent, CssBaseline, Container, Drawer,
 List, Divider, ListItem, ListItemIcon, ListItemText, TextField, ThemeProvider, Paper, createMuiTheme,
  MenuItem, InputLabel, FormControl, FormControlLabel, Grid, SvgIcon, Radio, RadioGroup, FormLabel,
  Avatar, CardMedia, Modal, Backdrop, Fade } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import NotListedLocationTwoToneIcon from '@material-ui/icons/NotListedLocationTwoTone';
import LinkIcon from '@material-ui/icons/Link';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import Select from '@material-ui/core/Select';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InfoIcon from '@material-ui/icons/Info';

import AjoutObjetTrouve from './AjoutObjetTrouve';
import AjoutObjetPerdu from './AjoutObjetPerdu';
import ChercherObjetPerdu from './ChercherObjetPerdu';
import Accueil from './Accueil';
import SuggestionObjetPerdu from './SuggestionObjetPerdu';

import logo from '../images/logo.jpg';


function Header2() {

 const Item = styled(Paper)(({ theme }) => ({
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   backgroundColor: 'transparent',
 }));

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#f5f5f5'

        },
    grid: {
        marginLeft:30
    },
    link: {
        textDecoration: "none",
        color: '#004d40',
        fontSize: 17,
        fontWeight: 'bold',
        fontVariant: 'small-caps'

    }
}
));

const classes = useStyles();

const drawerWidth = 240;

return (
<div>
 <AppBar position="fixed" className={classes.appBar}>
        <Toolbar><Link to="/" className={classes.link}>
          <Typography variant="h6" noWrap component="div">
            <img src={logo} alt="this is logo image" />
          </Typography>
          </Link>

         <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={3}>
                  <Item><Link to="/AjoutObjetTrouve" className={classes.link}>Ajout objet trouve </Link></Item>
                </Grid>
                <Grid item xs={3}>
                  <Item><Link to="/AjoutObjetPerdu" className={classes.link}>Ajout objet perdu </Link></Item>
                </Grid>
                <Grid item xs={3}>
                  <Item><Link to="/ChercherObjetPerdu" className={classes.link}>Chercher un objet </Link></Item>
                </Grid>
                <Grid item xs={3}>
                  <Item><Link to="/SuggestionObjetPerdu" className={classes.link}>Suggestions </Link></Item>
                </Grid>
              </Grid>

        </Toolbar>
      </AppBar>
</div>

)
}

export default Header2;