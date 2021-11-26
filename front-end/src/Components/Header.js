import React, { Component, Fragment, useState } from 'react';
import clsx from 'clsx';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Box, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function Header() {
const drawerWidth = 240;
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
}));
const classes = useStyles();
const [ouvrir, setOuvrir] = React.useState(false);
const handleDrawerOpen = () => {
        setOuvrir(true);
};
const handleDrawerClose = () => {
        setOuvrir(false);
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
    </Box>
  )
}

export default Header;