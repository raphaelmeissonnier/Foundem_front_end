import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import {UserContext} from "./UserContext";


const ObjetsMatche = (props) => {

    const [items, setItems] = useState([]);

    const [idObjetT,setIdObjetT] = useState();
    const [idObjetP,setIdObjetP] = useState();

    const [iscreated, setcreated] = useState(false);

    const userId = useContext(UserContext);
    console.log("ObjetsMatch.js - UserContextId: ", userId);

    //RECUPERER LES MESSAGES D'ERREURS DEPUIS LE BACK
    useEffect( async () =>{
        setIdObjetT(props.match.params.idObjet)
        if(userId)
        {
            let response = await fetch("/objetsperdus/user/"+userId);
            let data = await response.json();
            setItems(data);
            console.log("ObjetsMatche.js - items: ", items);
        }
        else
        {
            console.log("ObjetsMatch.js - User empty");
            return;
        }
    }, [userId])

    function afficher()
  {
      var renderObjets = [];
      for(var i =0; i < items.length; i++){
          renderObjets.push(
              <div className="list-item" key={items[i].id}>
                  <li>{items[i].intitule}</li>
                  <li>{items[i].description}</li>
                  <li>{items[i].categorie}</li>
                  <li>{items[i].date}</li>
                  {/*<button onClick={() => console.log("Id depuis button: ", items[i][0].id)}>C'est mon objet</button>{/*TOUS LES ID DE PRIS */}
                  <button onClick={handleMatch} value={items[i].id} >Matcher</button>
                  { iscreated ? <Redirect to = "/" /> : console.log("not redirect")}
                  <br></br>
              </div>
          );
      }
      return renderObjets;
  }

  function handleMatch(e)
  {
      if(e)
      {
          console.log("Dans le if",e.target.value)
          setIdObjetP(e.target.value);
      }
      if(idObjetP){
        console.log("Id Objet P",idObjetP)
        console.log("Id Objet T",idObjetT)
        createMatch();
      }
  }

  async function createMatch() {
    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ idObjetT: parseInt(idObjetT), idObjetP: parseInt(idObjetP) })
    };
    await fetch('/objetsmatche', requestOptions)
            .then(response => response.json()
            /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
            */
            .then(data => data.result ? (window.alert(data.msg), setcreated(true)) : window.alert(data.msg)));
}

    console.log("Items perdus de l'user: ", items);
    //ON RECUPERE LES OBJETS PERDUS DE L'UTILISATEUR

    return(
        <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Page de Matching</h1>
        <br></br>
        <h4>Vos Objets Perdus :</h4>
        {items.length ? afficher() : null}
        </div>
    )

}

export default ObjetsMatche;