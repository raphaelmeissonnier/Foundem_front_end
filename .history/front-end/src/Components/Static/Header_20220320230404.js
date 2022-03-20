import React, {useContext, useEffect, useState} from 'react';
import {AppBar, Box, Toolbar, Typography, Menu, MenuItem, IconButton, Avatar, Snackbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import logo from '../../images/logo.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import i18 from "../../Translation/i18n";
import {UserContext} from "../Authentification/UserContext";
import {getUser, getAllRdv} from "../../Actions/UserAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './styles.css';

var _ = require('lodash');

const Header = () =>{

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [username, setUsername] = useState(null);
  const countResponse = useSelector((state) => state.UserReducer.getAllRdvResponse);
  const [count, setCount] = useState(null);
  const userID = useContext(UserContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducer.getUserResponse);

  useEffect( async () => {
    if(userID) {
      dispatch(getUser(userID));
      dispatch(getAllRdv(userID));
    }
  }, [userID])

  useEffect(async () => {
    if(userData)
    {
      setUsername(userData.username);
    }
    if(countResponse)
    {
      setCount(countResponse.nbRdv);
    }
  })

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotif(event.currentTarget);
  }

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotif(null);
  }

  const [myOptions, setMyOptions] = useState([])
  
  const getDataFromAPI = () => {
    console.log("Options Fetched from API")
  
    fetch('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
      return response.json()
    }).then((res) => {
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        myOptions.push(res.data[i].employee_name)
      }
      setMyOptions(myOptions)
    })
  }

  return(
      <AppBar position="static">
        <Container maxWidth="xl" style={{flexDirection:'row'}}>
          <Toolbar disableGutters>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                href="/"
                color="inherit"
            >
              <img src={logo} alt="logo"/>
            </IconButton>

            {!_.isEmpty(userData) ?
                <div>
                  <Box sx={{ paddingLeft: 10, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: 'block', md: 'none' },
                        }}
                    >
                      <MenuItem component={Link} to={"/AjouterObjetPerdu"} >
                        <Typography className="textPolice" textAlign="center">{i18.t('header.lostItem')}</Typography>
                      </MenuItem>
                      <MenuItem component={Link} to={"/AjouterObjetTrouve"}>
                        <Typography className="textPolice" textAlign="center">{i18.t('header.foundItem')}</Typography>
                      </MenuItem>
                      <MenuItem component={Link} to={"/ChercherObjetPerdu"}>
                        <Typography className="textPolice" textAlign="center">{i18.t('header.searchItem')}</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Box sx={{ paddingLeft:20, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button className="textPolice" href="/AjouterObjetPerdu" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                      {i18.t('header.lostItem')}
                    </Button>
                    <Button className="textPolice" href="/AjouterObjetTrouve" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                      {i18.t('header.foundItem')}
                    </Button>
                    <Button className="textPolice" href="/ChercherObjetPerdu" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                      {i18.t('header.searchItem')}
                    </Button>
                  </Box>
                </div>
                : <Box sx={{ paddingLeft:20, flexGrow: 1, display: { xs: 'none', md: 'flex' }, width:'55%' }}/>}

            <Box sx={{textAlign:'right', width:'40%'}}>
              {!_.isEmpty(userData) ?
                  <Tooltip className="textPolice" title={i18.t('header.notifications')}>
                  <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      onClick={handleOpenNotificationsMenu}
                  >
                    <Badge badgeContent={count} color="error">
                      <NotificationsIcon/>
                    </Badge>
                  </IconButton>
                  </Tooltip>
                : null
              }
              {!_.isEmpty(userData) ?
                  <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElNotif}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElNotif)}
                      onClose={handleCloseNotificationsMenu}
                  >
                    <MenuItem component={Link} to={"/MesRdv"}>
                      <Typography className="textPolice">{i18.t('header.notificationsMessage')}</Typography>
                    </MenuItem>

                  </Menu> : null
              }
              <Tooltip className="textPolice" title={i18.t('header.profil')}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {userData ?
                    <Avatar alt={userData.username} src={"/"+userData.id_utilisateur+"_user_"+userData.img} />:
                    <AccountCircleIcon fontSize="large" color="primary" style={{color:"white"}}/>
                  }
                </IconButton>
              </Tooltip>


              {!_.isEmpty(userData) ?
                  <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                  >
                    <MenuItem  component={Link} to={"/Profil"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.profil')}</Typography>
                    </MenuItem>
                    <MenuItem  component={Link} to={"/MesObjets"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.myItems')}</Typography>
                    </MenuItem>
                    <MenuItem  component={Link} to={"/MesRdv"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.myRdv')}</Typography>
                    </MenuItem>
                    <MenuItem  component={Link} to={"/MonSolde"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.myBalance')}</Typography>
                    </MenuItem>
                    <MenuItem  component={Link} to={"/Logout"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.logout')}</Typography>
                    </MenuItem>
                  </Menu>
                  :
                  <Menu
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                  >
                    <MenuItem  component={Link} to={"/Inscription"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.registration')}</Typography>
                    </MenuItem>
                    <MenuItem  component={Link} to={"/Login"}>
                      <Typography className="textPolice" textAlign="center">{i18.t('header.login')}</Typography>
                    </MenuItem>
                  </Menu>
              }

            </Box>
            <div style={{ marginLeft: '20%', marginTop: '30px' }}>
      <Autocomplete
        style={{ width: 300 }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <TextField {...params}
            onChange={getDataFromAPI}
            variant="outlined"
            label="Chercher..."
          />
        )}
      />
    </div>
    <h4>{username}</h4>
        
          </Toolbar>
        </Container>
      </AppBar>
  )
}
export default Header;