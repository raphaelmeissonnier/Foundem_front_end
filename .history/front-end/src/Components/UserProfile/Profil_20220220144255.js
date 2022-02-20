import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";

const Profil = () => {


    function handleChange() {

    }

    <div className="Changer profil">

        <center><p> Changez votre profil : </p></center>
        <input type="file" onChange={handleChange} />


    </div>
  


}
export default Profil;