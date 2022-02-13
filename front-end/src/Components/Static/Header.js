import React, {useContext, useEffect, useState} from 'react';
import {AppBar, Box, Toolbar, Typography, Menu, MenuItem, IconButton, Avatar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import imageAvatar from '../../images/Cartes.png';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import logo from '../../images/logo.jpg'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import i18 from "../../Translation/i18n";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";

var _ = require('lodash');

const Header = () =>{


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [username, setUsername] = useState(null);
  const userID = useContext(UserContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducer.getUserResponse);

  useEffect( async () => {
    dispatch(getUser(userID));
  }, [userID])

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
                      <Typography textAlign="center">{i18.t('header.lostItem')}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to={"/AjouterObjetTrouve"}>
                      <Typography textAlign="center">{i18.t('header.foundItem')}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to={"/ChercherObjetPerdu"}>
                      <Typography textAlign="center">{i18.t('header.searchItem')}</Typography>
                    </MenuItem>
                  </Menu>
              </Box>
              <Box sx={{ paddingLeft:20, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button href="/AjouterObjetPerdu" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {i18.t('header.lostItem')}
              </Button>
              <Button href="/AjouterObjetTrouve" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {i18.t('header.foundItem')}
              </Button>
              <Button href="/ChercherObjetPerdu" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {i18.t('header.searchItem')}
              </Button>
          </Box>
              </div>
              : <Box sx={{ paddingLeft:20, flexGrow: 1, display: { xs: 'none', md: 'flex' }, width:'55%' }}/>}

          <Box sx={{textAlign:'right', width:'40%'}}>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <EmojiEventsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={43} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Profil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username}  src={imageAvatar} />
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
                <MenuItem  component={Link} to={"/MesObjets"}>
                  <Typography textAlign="center">{i18.t('header.myItems')}</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/MesRdv"}>
                  <Typography textAlign="center">{i18.t('header.myRdv')}</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/MonSolde"}>
                  <Typography textAlign="center">{i18.t('header.myBalance')}</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/Logout"}>
                  <Typography textAlign="center">{i18.t('header.logout')}</Typography>
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
                  <Typography textAlign="center">{i18.t('header.registration')}</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/Login"}>
                  <Typography textAlign="center">{i18.t('header.login')}</Typography>
                </MenuItem>
                </Menu>
              }
            
          </Box>
          <h4>{!_.isEmpty(userData) ? userData.username : null }</h4>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header;