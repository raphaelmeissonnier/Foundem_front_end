import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getUser} from "../Actions/UserAction";

const Profil = () => {

const user = useSelector((state) => state.UserReducer);

    return (
    <div className="Mes objets">
    <div>
    // À modifier c'était un test
    <p> ok jdois enlever </p>

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
    </div>);



}
export default Profil;