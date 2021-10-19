import React, { Component, Text } from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import {  Link } from "react-router-dom";
import Principale from './principale';
import Deuxième from './deuxieme';



function Ajout_objT() {


    return(
      <div>
      
    
        <div style={{textAlign:'center', backgroundColor:'#ceaec3'}}>
          <form action="/ajout_objetT" method="POST">
            <label>
            Intitulé :
            <input type="text" name="intitule" />
            </label>
            <br/>
            <label>
            Description :
            <input type="text" name="description" />
            </label>
            <br/>
            <label>
                Catégories
            <select>
            <option selected value="hightech">High tech</option>
            <option value="livre">Livre</option>
            <option  value="beaute_sante">Beauté et santé</option>
            <option value="garderobe">Garde robe</option>
            <option value="fourniture_bureau">Fourniture de bureau </option>
            <option value="equipement">Equipement</option>
            <option value="cartes">Cartes</option>
            <option value="autre">Autre</option>


            </select>
            </label>
<br/>
            <label>
              Coordonnées :
              <br/>
              <label>
                Latitude :
                <input type="text" name="latitude" />
              </label>
              <label>
                Longitude :
                <input type="text" name="longitude" />
              </label>


            </label>
            
            
            <Button variant="contained"> Envoyer</Button>
</form>
      </div>

      </div>
    )
  }
  
  export default Ajout_objT;