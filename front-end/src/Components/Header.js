import React, { Component, Fragment, useState } from 'react';
import clsx from 'clsx';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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



function Header() {
const styles = {
    paperContainer: {
        height: 100,
        textAlign:'center',
    }
  };

const drawerWidth = 240;
const [darkMode, setDarkMode] = useState(false);

const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark": "light",
    },
  });
const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          minWidth: 275,
        },
        menuButton: {
            backgroundColor: '#5fa082',
            marginRight: theme.spacing(2),
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#5fa082',
            transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        },
        appBarShift: {
           marginLeft: drawerWidth,
           width: `calc(100% - ${drawerWidth}px)`,
           transition: theme.transitions.create(['width', 'margin'], {
           easing: theme.transitions.easing.sharp,
           duration: theme.transitions.duration.enteringScreen,
        }),
        },
        toolbar: {
          display: 'flex',
          backgroundColor: '#5fa082',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: theme.spacing(0, 1),
          // necessary for content to be below app bar
          ...theme.mixins.toolbar,
        },
        hide: {
          display: 'none',
        },
        drawerOpen: {
          width: drawerWidth,
          backgroundColor: '#939290',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawerClose: {
          backgroundColor: '#939290',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          overflowX: 'hidden',
          width: theme.spacing(7) + 1,
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
          },
        },
        media: {
           height: 140,
         },
         drawer: {
           width: drawerWidth,
           backgroundColor: '#939290',
           flexShrink: 0,
           whiteSpace: 'nowrap',
         },
         drawerPaper: {
           width: drawerWidth,
         },
        content: {
           flexGrow: 1,
           padding: theme.spacing(3),
         },
         control: {
           padding: theme.spacing(2),
         },
         modal: {
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         },
         paper: {
           backgroundColor: theme.palette.background.paper,
           border: '2px solid #000',
           boxShadow: theme.shadows[5],
           padding: theme.spacing(2, 4, 3),
         },
}));
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [ouvrir, setOuvrir] = React.useState(false);
const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleDrawerOpen = () => {
    setOuvrir(true);
  };

  const handleDrawerClose = () => {
    setOuvrir(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: ouvrir,})}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                //onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                [classes.hide]: ouvrir,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Found'em
              </Typography>
            </Toolbar>
    </AppBar>
    <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: ouvrir,
              [classes.drawerClose]: !ouvrir,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: ouvrir,
                [classes.drawerClose]: !ouvrir,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>

            <Link to="/AjoutObjetTrouve">
            <ListItem button>
            <ListItemIcon>
              <AddCircleOutlineTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Ajouter" />
          </ListItem>
          </Link>

          <Link to="/AjoutObjetPerdu" >
          <ListItem button>
            <ListItemIcon>
              <AddCircleTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Autres outils" />
          </ListItem>
          </Link>

          <Link to="/SuggestionObjetPerdu" >
          <ListItem button>
            <ListItemIcon>
              <NotListedLocationTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Autres outils" />
          </ListItem>
          </Link>

            </List>
            <Divider />
            <List>
            <Link to="/apropos" >
            <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="A propos" />
          </ListItem>
          </Link>
          <Link to="/sources" >
          <ListItem button>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Sources" />
          </ListItem>
          </Link>
            </List>
          </Drawer>
    </Box>
  )
}

export default Header;