import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";

const Profil = () => {

const user = useSelector((state) => state.UserReducer);

function handleChange(){

}
    return (
    <div className="Mes objets">
    <div>
    

    <center><p> Bienvenue sur ton profil {user.username} ! </p>

    <Link to="/MesObjets">
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
                                  Mes objets
                              </Button>
                          </Link>
                          </center>
    </div>

    <center><p>Changez votre profil ici :</p>
    <div>
        <input type="file" onChange={handleChange} />
    </div>
    </center>
    </div>);



}
export default Profil;