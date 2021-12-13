import React, {useContext, useState} from 'react';
//import { Paper, Select, Button } from '@material-ui/core';
//import { makeStyles, styled } from '@material-ui/core/styles';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './ajoutObjetTrouve.css'
import Geocoder from "react-mapbox-gl-geocoder"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Redirect} from "react-router-dom";
import {UserContext} from "./UserContext";

const {config} = require('../config');
const mapboxApiKey = config.MY_API_TOKEN;
const params = { country: "fr" };


const AjoutObjetPerdu = () => {

    const initialValues = {
        inititule: "",
        description: "",
        date: "",
        categorie:"",
        rayon:""
    };

    const [created, setCreated] = useState(false);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const userId = useContext(UserContext);

    const viewport2 = { width: 400, height: 400 };


    const validationSchema = Yup.object().shape({
        intitule: Yup.string().min(3).max(15).required("Veuillez saisir ce champs"),
        description: Yup.string().max(200),
        date: Yup.date().required("Veuillez saisir ce champs"),
        categorie: Yup.string().required("Veuillez saisir ce champs"),
        rayon: Yup.number().required("Veuillez saisir ce champs"),
    })

    function onSubmit(values){
        console.log("On entre dans la fonction onSubmit")
        if(userId)
        {
            //Si au moins un des champs n'est pas saisi
            if(!values.intitule || !values.date || !values.categorie || !values.rayon || !longitude || !latitude)
            {
                console.log("AjoutObjetPerdu.js - Parameters required");
                return;
            }
            console.log("On va lancer le fetch");
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify( {intitule: values.intitule, description: values.description, date: values.date, longitude: longitude, latitude: latitude, user_id: userId, categorie: values.categorie, rayon: values.rayon })
            };
            fetch('/objetsperdus', requestOptions)
                //Je récupère la réponse émise par le back
                .then(response => response.json()
                    /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                      Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                    */
                    .then(data => data.result ? (window.alert(data.message), setCreated(true)) : window.alert(data.message)));
        }
        else
        {
            console.log("AjoutObjetPerdu.js - userId empty");
        }
    }

    //Récupération de la longitude et latitude à partir de l'adresse
    function onSelected(viewport, item){
        console.log("Item",item.place_name)
        console.log("Item",item)
        setLongitude(item.center[0])
        setLatitude(item.center[1])
        console.log("Item long",typeof(item.center[0]))
    }

    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Intitulé:</label>
                    <ErrorMessage name="intitule" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="intitule"
                        placeholder="Bonnet noir"
                    />
                    <br></br>

                    <label>Description:</label>
                    <ErrorMessage name="description" component="span" />
                    <Field
                        as="textarea"
                        autoComplete="off"
                        id="inputCreatePost"
                        name="description"
                        placeholder="Bonnet noir de marque Lacoste"
                    />
                    <br></br>

                    <label>Catégorie:</label>
                    <Field as="select" name="categorie">
                        <option value="Autres">Choisir une catégorie</option>
                        <option value="PORTEFEUILLE">Portefeuille & CB</option>
                        <option value="PAPIERS">Papiers & documents officiels</option>
                        <option value="BAGAGES">Sacs & Bagages</option>
                        <option value="ELECTRONIQUE">Electronique</option>
                        <option value="ENFANTS">Affaires d'enfants</option>
                        <option value="VETEMENTS">Vêtements</option>
                        <option value="EFFETS PERSONNELS">Effets personnels</option> {/* Effets personnels = clés, lunettes, ...*/}
                    </Field>
                    <br></br>

                    <label>Date:</label>
                    <Field type="date" name="date"/>
                    <br></br>

                    <label>Adresse:</label>
                    <Geocoder
                        mapboxApiAccessToken={mapboxApiKey}
                        hideOnSelect={true}
                        onSelected={onSelected}
                        viewport={viewport2}
                        updateInputOnSelect={true}
                        initialInputValue=" "
                        queryParams={params}
                    />
                    <br></br>

                    <label>Rayon:</label>
                    <Field as="select" name="rayon" placeholder="Choisir un rayon">
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="15">15 km</option>
                        <option value="20">20 km</option>
                    </Field>
                    <br></br>

                    <button type="submit">Valider</button>
                </Form>
            </Formik>
            {created ? <Redirect to = "/"/> : console.log("not redirect")}
        </div>
    );

    /*
  const [intitule, setIntitule] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [adresseMail, setAdresseMail] = useState();
  const [categorie, setCategorie] = useState();
  const [rayon, setRayon]=useState();

  // Cette fonction envoyer les infos du formulaire au back

  function envoyerInformations() {

    console.log("intitulé envoyé: ", intitule);
    console.log("description envoyé: ", description);
    console.log("date envoyé: ", date);
    console.log("longitude envoyé: ", longitude);
    console.log("latitude envoyé: ", latitude);
    console.log("adresseMail envoyé: ", adresseMail);
    console.log("categorie envoyé: ", categorie);
    console.log("rayon envoyé: ", rayon);

    //Si un des champs n'a pas été saisi, l'utlisateur est averti par une pop-up

    if(!intitule || !description || !date || !longitude || !latitude || !adresseMail || !categorie || !rayon)
    {
        window.alert("Veuillez saisir tous les champs du formulaire !");
        return;
    }
    //Si tous les champs ont été saisis alors appel de l'API
    const requestOptions = {
        port: 3001,
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({intitule: intitule, description: description, date: date, longitude: longitude, latitude: latitude, adresseMail: adresseMail, categorie: categorie, rayon: parseInt(rayon)})
    };
    fetch('/objetsperdus', requestOptions)
        .then(response => response.json());
    console.log("AjoutObjetPerdu: ", )
  }

  //Récupération de valeur du champs 'Intitulé'
  function _handleIntituleChange(e){
    setIntitule(e.target.value);
  }

  //Récupération de valeur du champs 'Description'
  function _handleDescriptionChange(e){
    setDescription(e.target.value);
  }

  //Récupération de valeur du champs 'Date'
  function _handleDateChange(e){
    setDate(e.target.value);
  }

  //Récupération de valeur du champs 'Adresse mail'
  function _handleAdresseMailChange(e){
    setAdresseMail(e.target.value);
  }

  //Récupération de valeur du champs 'Date'
  function _handleCategorieChange(e){
    setCategorie(e.target.value);
  }

  //Récupération de valeur du champs 'Rayon'
  function _handleRayonChange(e){
    setRayon(e.target.value);
  }

  //Récupération de la longitude et latitude à partir de l'adresse
  function onSelected(viewport, item){
    console.log("Item",item.place_name)
    console.log("Item",item)
    setLongitude(item.center[0])
    setLatitude(item.center[1])
    console.log("Item long",typeof(item.center[0]))
  }

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const useStyles = makeStyles((theme) => ({
    root: {
          flexGrow: 1,
          minWidth: 275,
        },
    div: {
          alignItems: 'center',
    },
    grid: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          marginLeft: '70vh',
          alignItems: 'center',

        },
    title: {
          flexGrow: 1,
          alignItems: 'center',
          textAlign: 'center',

        },
    geocoder: {
          zIndex: 1,
          margin: '20px',
      },
    mapboxglctrlgeocoder: {
          minWidth: '100%',
      }

}));

const viewport2 = {
  width: 400,
  height: 400
};

const classes = useStyles();
  return(
    <div className={classes.div}>
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className={classes.title}> Ajouter un objet perdu </h1>
        <br></br>
        Intitulé: <input type="text" onChange={_handleIntituleChange}/>
        <br></br>
        Description: <input type="text" onChange={_handleDescriptionChange}/>
        <br></br>
        <div onChange={_handleCategorieChange}>
            <input type="radio" value="hightech" /> High-Tech
            <input type="radio" value="livres" /> Livres
            <input type="radio" value="beaute_sante" /> Beauté et santé
            <input type="radio" value="garde_robe" /> Garde-robe
            <input type="radio" value="cartes" /> Cartes
            <input type="radio" value="autres" /> Autres
        </div>
        Date: <input type="date" onChange={_handleDateChange}/>
        <br></br>
        Adresse mail: <input type="email" onChange={_handleAdresseMailChange}/>
        <br></br>
        Adresse: <Geocoder
          mapboxApiAccessToken={mapboxApiKey}
          hideOnSelect={true}
          onSelected={onSelected}
          viewport={viewport2}
          updateInputOnSelect={true}
          initialInputValue=" "
          queryParams={params}
        />
        <br></br>
        Dans un rayon de:
        <div onChange={_handleRayonChange}>
            <input type="radio" value="5" /> 5km
            <input type="radio" value="10" /> 10km
            <input type="radio" value="15" /> 15km
            <input type="radio" value="20" /> 20km
        </div>
        <Button onClick={envoyerInformations}>Ajouter</Button>
    </div>
  )*/
}

export default AjoutObjetPerdu;