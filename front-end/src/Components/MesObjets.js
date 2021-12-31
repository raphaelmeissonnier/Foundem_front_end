import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getObjetsPerdus} from "../Actions/UserAction";
const params = { country: "fr" };


const MesObjets = () => {
const user = useSelector((state) => state.UserReducer);


    return (
    <div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
     <center><p> Salut {user.username} ! Ici, tu peux consulter tous tes objets perdus ou trouvés :) </p>

     <strong><p>{user.username}, tu as perdu tous ces objet. Les voici : </p></strong>
     </center>
    </div>);



}
export default MesObjets;