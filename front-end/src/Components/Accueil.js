import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getUser} from "../Actions/UserAction";

var _ = require('lodash');

const Accueil = (props) => {

    //On récupère les informations de l'utilisateur
    //const userId = useContext(UserContext);
    //const dispatch = useDispatch();
    const userData = useSelector((state) => state.UserReducer);

    useEffect(() => {
        //let userData = dispatch(getUser(userId));
        console.log("Accueil.js - userData: ", userData);
    }, [props])
    //console.log("Accueil.js - userData: ", userId);

    return (
      <div className="Accueil">
          <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h1> Un objet perdu se transforme souvent en objet trouvé ! </h1>
            <h5> Vous avez perdu ou trouvé un objet ? Déclarez-le et la communauté
            se met en mouvement pour vous aider à retrouver votre objet </h5>

              {/* Si l'utilisateur est connecté il aura accès à toutes les rubriques sauf 'Connexion' et 'Inscription
                  Si l'utilisateur n'est pas connecté il n'aura accès qu'aux rubriques 'Connexion' et 'Inscription'
              */}

              {!_.isEmpty(userData) ?
                  <Box direction="row" spacing={4}>
                      <Link to="/AjoutObjetTrouve">
                          <Button
                              variant="outlined"
                              style={{
                                  borderRadius: 2,
                                  backgroundColor: "#5fa082",
                                  padding: "5px 20px",
                                  fontSize: "15px"
                              }}
                              variant="contained"
                          >
                              J'ai trouvé un objet
                          </Button>
                      </Link>

                      <Link to="/AjoutObjetPerdu">
                          <Button
                              variant="outlined"
                              style={{
                                  borderRadius: 2,
                                  backgroundColor: "#5fa082",
                                  padding: "5px 20px",
                                  fontSize: "15px"
                              }}
                              variant="contained"
                          >
                              J'ai perdu un objet
                          </Button>
                      </Link>

                      <Link to="/ChercherObjetPerdu">
                          <Button
                              variant="outlined"
                              style={{
                                  borderRadius: 2,
                                  backgroundColor: "#6eba97",
                                  padding: "5px 20px",
                                  fontSize: "15px"
                              }}
                              variant="contained"
                          >
                              Je recherche un objet
                          </Button>
                      </Link>

                      <Link to="/Logout">
                          <Button
                              variant="outlined"
                              style={{
                                  borderRadius: 2,
                                  backgroundColor: "#6eba97",
                                  padding: "5px 20px",
                                  fontSize: "15px"
                              }}
                              variant="contained"
                          >
                              Deconnexion
                          </Button>
                      </Link>
                  </Box>
              :
                  <Box direction="row" spacing={2}>
                      <Link to="/Inscription">
                          <Button
                              variant="outlined"
                              style={{
                                  borderRadius: 2,
                                  backgroundColor: "#6eba97",
                                  padding: "5px 20px",
                                  fontSize: "15px"
                              }}
                              variant="contained"
                          >
                              Inscription
                          </Button>
                      </Link>

                      <Link to="/Login">
                          <Button
                              variant="outlined"
                              style={{
                                  borderRadius: 2,
                                  backgroundColor: "#6eba97",
                                  padding: "5px 20px",
                                  fontSize: "15px"
                              }}
                              variant="contained"
                          >
                              Connexion
                          </Button>
                      </Link>
                  </Box>
              }
          </div>
      </div>
    )
}

export default Accueil;