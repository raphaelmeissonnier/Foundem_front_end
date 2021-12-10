import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";


const ObjetsMatche = (props) => {

    const [items, setItems] = useState([]);
    //console.log("props: ", props.match.params.idObjetTrouve);
    console.log("props", props.params.idObjetTrouve);
    useEffect(async () => {
        console.log("On entre dans le useEffect");
        let response = await fetch("/objetsperdus/user/1");
        console.log("Response: ", response);
        let data = await response.json();
        console.log("Objets perdus de l'utlisateur 1",data)
        setItems(data);
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
                    <button onClick={creerMatch} value={items[i].id}>Matcher</button>
                </div>
            );
        }
        return renderObjets;
    }

    async function creerMatch(e)
    {
        /*if(e.target.value && props.)
        {
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ objettrouve_id: props., objetperdu_id: e.target.value})
            };
            fetch('/objetstrouves', requestOptions)
                .then(response => response.json());
        }*/
        console.log("On envoie au back")
    }
    console.log("Items perdus de l'user: ", items);
    //ON RECUPERE LES OBJETS PERDUS DE L'UTILISATEUR

    return(
        <div>
        <br></br>
    <br></br>
    <br></br>
    <br></br>
            <h3>Sélectionner votre objet</h3>
            {items.length ? afficher() : null}
        </div>
    )

}

export default ObjetsMatche;