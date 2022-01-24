import React from 'react';
import {AppBar, Box, Toolbar, Typography, Menu, MenuItem, IconButton, Avatar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import imageAvatar from '../images/Cartes.png';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import logo from '../images/logo.jpg'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';


var _ = require('lodash');

const Header = () =>{


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userData = useSelector((state) => state.UserReducer);

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
                  <Typography textAlign="center">J'ai Perdu un Objet</Typography>
                </MenuItem>
                <MenuItem component={Link} to={"/AjouterObjetTrouve"}>
                  <Typography textAlign="center">J'ai Trouvé un Objet</Typography>
                </MenuItem>
                <MenuItem component={Link} to={"/ChercherObjetPerdu"}>
                  <Typography textAlign="center">Rechercher un Objet</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ paddingLeft:20, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button href="/AjouterObjetPerdu" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                J'ai Perdu un Objet
              </Button>
              <Button href="/AjouterObjetTrouve" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                J'ai Trouvé un Objet
              </Button>
              <Button href="/ChercherObjetPerdu" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                Rechercher un Objet
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
                <Avatar alt={userData.username}  src={imageAvatar} />
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
                  <Typography textAlign="center">Mes Objets</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/MesRdv"}>
                  <Typography textAlign="center">Mes Rendez-vous</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/Logout"}>
                  <Typography textAlign="center">Deconnexion</Typography>
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
                  <Typography textAlign="center">Inscription</Typography>
                </MenuItem>
                <MenuItem  component={Link} to={"/Login"}>
                  <Typography textAlign="center">Connexion</Typography>
                </MenuItem>
                </Menu>
              }
            
          </Box>
          <h4>{userData.username}</h4>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header;