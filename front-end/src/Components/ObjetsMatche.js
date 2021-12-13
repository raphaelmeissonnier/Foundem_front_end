import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";



const ObjetsMatche = (props) => {

    const [items, setItems] = useState([]);
    const userData = useSelector((state)=> state.UserReducer);

    const [idUser, setIdUser]=useState(null);
    const [idObjetP, setIdObjetP]=useState(null);
    const [idObjetT, setIdObjetT]=useState(null);

    console.log("User Data",userData.id);
    console.log("ID Objet T",props.match.params.idObjet)

    useEffect(async () => {
        console.log("On entre dans le useEffect");
        setIdUser(userData.id)
        setIdObjetT(props.match.params.idObjet)
        console.log('await');
        if(idUser ){
            let response = await fetch("/objetsperdus/user/"+idUser);
            console.log('await: ', await fetch("/objetsperdus/user/"+idUser));
            //let response = await fetch("/objetsperdus/user/1");
            console.log("Response: ", response);
            let data = await response.json();
            console.log("Objets perdus de l'utlisateur 1",data)
            setItems(data);
        }
    }, []);

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
                  <Link to={{pathname: '/' }}><button onClick={handleMatch} >Matcher</button></Link>
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