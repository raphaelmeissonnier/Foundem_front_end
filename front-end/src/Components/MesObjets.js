import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getObjetsPerdus} from "../Actions/ObjetsPerdusAction";
import {getObjetsTrouves} from "../Actions/ObjetsTrouvesAction";

const params = { country: "fr" };


const MesObjets = (props) => {

// On va récupérer les informations des objets

const user = useSelector((state) => state.UserReducer);
const recupererobjetsperdus = useSelector((state) => state.ObjetsPerdusReducer);
const recupererobjetstrouves = useSelector((state) => state.ObjetsTrouvesReducer);

const dispatch = useDispatch();

useEffect(async() =>  {
    if(user.id){
        dispatch(getObjetsPerdus(user.id));
        dispatch(getObjetsTrouves(user.id));
    }
}, [user.id]);

console.log(recupererobjetsperdus);
console.log(recupererobjetstrouves);

 function afficher()
         {
         if(recupererobjetsperdus != null){
                 return(
                     <div>
                         <table style={tableStyle}>
                             <thead>
                             <tr style={trHoverStyle}>
                                 <th style={thStyle}>Intitulé</th>
                                 <th style={thStyle}>Description</th>
                                 <th style={thStyle}>Catégorie</th>
                                 <th style={thStyle}>Date</th>
                             </tr>
                             </thead>
                             <tbody>

                             {recupererobjetsperdus.map(item => {
                                 return(
                                     <tr style={trChildStyle} key={item.id}>
                                         <td style={tdStyle}>{item.intitule}</td>
                                         <td style={tdStyle}>{item.description}</td>
                                         <td style={tdStyle}>{item.categorie}</td>
                                         <td style={tdStyle}>{item.date}</td>
                                     </tr>
                                 );
                             })}

                             </tbody>
                         </table>
                     </div>
                 );
         }

         if(recupererobjetstrouves != null){
                          return(
                              <div>
                                  <table style={tableStyle}>
                                      <thead>
                                      <tr style={trHoverStyle}>
                                          <th style={thStyle}>Intitulé</th>
                                          <th style={thStyle}>Description</th>
                                          <th style={thStyle}>Catégorie</th>
                                          <th style={thStyle}>Date</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      {recupererobjetstrouves.map(item => {
                                          return(
                                              <tr style={trChildStyle} key={item.id}>
                                                  <td style={tdStyle}>{item.intitule}</td>
                                                  <td style={tdStyle}>{item.description}</td>
                                                  <td style={tdStyle}>{item.categorie}</td>
                                                  <td style={tdStyle}>{item.date}</td>
                                              </tr>
                                          );
                                      })}

                                      </tbody>
                                  </table>
                              </div>
                          );
                  }
         }
             /*Some style*/
             const tableStyle = {
                 fontFamily: "Arial, Helvetica, sans-serif",
                 borderCollapse: "collapse",
                 width: "90%",
                 marginTop: "10px",
                 //center
                 marginLeft: "auto",
                 marginRight: "auto"
             }

             const tdStyle = {
                 border: "1px solid #ddd",
                 padding: "8px"
             }

             const thStyle = {
                 paddingTop: "12px",
                 paddingBottom: "12px",
                 textAlign: "left",
                 backgroundColor: "#04AA6D",
                 color: "white",
                 border: "1px solid #ddd",
                 padding: "8px",
             }

             const trHoverStyle = {
                 backgroundColor: "#ddd"
             }

             const trChildStyle = {
                 backgroundColor: "#f2f2f2"
             }


    return (
    <div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
     <center><p> Salut {user.username} ! Ici, tu peux consulter tous tes objets perdus ou trouvés :) </p>

     <strong><p>{user.username}, tu as perdu tous ces objets. Les voici : </p></strong>
     {afficher()}

     </center>
    </div>);



}
export default MesObjets;