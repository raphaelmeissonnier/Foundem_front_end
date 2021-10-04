import React, { Component, Text } from "react";

function Ajout_objT() {
    return(
        <div style={{textAlign:'center', backgroundColor:'#ceaec3'}}>
          <form>
            <label>
            Intitulé :
            <input type="text" name="intitule" />
            </label>
            <label>
            Description :
            <input type="text" name="description" />
            </label>
            <label>
                Catégories
            <select>
            <option value="grapefruit">Pamplemousse</option>
            <option value="lime">Citron vert</option>
            <option selected value="coconut">Noix de coco</option>
            <option value="mango">Mangue</option>
            </select>
            </label>
            
            
            <input type="submit" value="Envoyer" />
</form>
      </div>
    )
  }
  
  export default Ajout_objT;