import React, {useState, useEffect, useContext} from 'react';
import { Redirect} from "react-router-dom";
import {UserContext} from "./UserContext";
import _ from "lodash";
import * as moment from "moment";
import {tableStyle, tdStyle, thStyle, trHoverStyle, trChildStyle} from "./styles";


const ObjetsMatche = (props) => {

    const [items, setItems] = useState([]);
    const [idObjetT,setIdObjetT] = useState();
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
            
        }
    }, [userId])

    function afficher()
    {
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
                    {items.map(item => {
                        return(
                            <tr style={trChildStyle} key={item.id}>
                                <td style={tdStyle}>{_.capitalize(item.intitule)}</td>
                                <td style={tdStyle}>{_.capitalize(item.description)}</td>
                                <td style={tdStyle}>{_.capitalize(item.categorie)}</td>
                                <td style={tdStyle}>{moment(item.date).format("L")}</td>
                                <td style={tdStyle}><button onClick={handleMatch} value={item.id}>Matcher</button></td>
                                { iscreated ? <Redirect to = "/" /> : console.log("not redirect")}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    function handleMatch(e)
    {
        if(e)
        {
            console.log("Dans le if",e.target.value)
            createMatch(e.target.value);
        }
    }

    async function createMatch(id_objet_p) {
      if(id_objet_p){
        console.log("Id Objet P",id_objet_p)
        const requestOptions = {
            port: 3001,
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ idObjetT: parseInt(idObjetT), idObjetP: parseInt(id_objet_p) })
        };
        await fetch('/objetsmatche', requestOptions)
                .then(response => response.json()
                /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                    Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                */
                .then(data => data.result ? (window.alert(data.msg), setcreated(true)) : window.alert(data.msg)));
    
      }
    }

    console.log("Items perdus de l'user: ", items);

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