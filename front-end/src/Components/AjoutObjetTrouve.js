import React, {useContext, useState} from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './ajoutObjetTrouve.css'
import Geocoder from "react-mapbox-gl-geocoder"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Redirect} from "react-router-dom";
import {UserContext} from "./UserContext";
import * as moment from 'moment';

const {config} = require('../config');
const mapboxApiKey = config.MY_API_TOKEN;
const params = { country: "fr" };


const AjoutObjetTrouve =() =>{

    const [created, setCreated] = useState(false);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const userId = useContext(UserContext);

    const viewport2 = { width: 400, height: 400 };

    //Contraintes de validation du formulaire
    const validationSchema = Yup.object().shape({
        intitule: Yup.string().min(3).max(15).required("Veuillez saisir ce champs"),
        description: Yup.string().max(200),
        date: Yup.date().required("Veuillez saisir ce champs").min(moment().subtract(365, 'days').calendar()).max(moment(new Date()).format('yyyy-MM-DD')),
        categorie: Yup.string().required("Veuillez saisir ce champs"),
    })

    const initialValues = {
        intitule: "",
        description: "",
        categorie: "",
        date: moment(new Date()).format('yyyy-MM-DD'),
    }

    function onSubmit(values){
        console.log("On entre dans la fonction onSubmit")
        if(userId)
        {
            //Si au moins un des champs n'est pas saisi
            if(!values.intitule || !values.date || !values.categorie || !longitude || !latitude)
            {
                console.log("AjoutObjetTrouve.js - Parameters required");
                return;
            }
            console.log("On va lancer le fetch");
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify( {intitule: values.intitule, description: values.description, date: values.date, longitude: longitude, latitude: latitude, user_id: userId, categorie: values.categorie })
            };
            fetch('/objetstrouves', requestOptions)
                //Je récupère la réponse émise par le back
                .then(response => response.json()
                    /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                      Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                    */
                    .then(data => data.result ? (window.alert(data.message), setCreated(true)) : window.alert(data.message)));
        }
        else
        {
            console.log("AjoutObjetTrouve.js - userId empty");
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
                        autoComplete="off"
                        //type="password"
                        id="inputCreatePost"
                        name="description"
                        placeholder="Bonnet de marque Lacoste"
                    />
                    <br></br>

                    {/* Effets personnels = clés, lunettes, ...*/}
                    <label>Catégorie:</label>
                    <ErrorMessage name="categorie" component="span" />
                    <Field as="select" name="categorie">
                        <option value="Autres">Choisir une catégorie</option>
                        <option value="PORTEFEUILLE">Portefeuille & CB</option>
                        <option value="PAPIERS">Papiers & documents officiels</option>
                        <option value="BAGAGES">Sacs & Bagages</option>
                        <option value="ELECTRONIQUE">Electronique</option>
                        <option value="ENFANTS">Affaires d'enfants</option>
                        <option value="VETEMENTS">Vêtements</option>
                        <option value="EFFETS PERSONNELS">Effets personnels</option>
                    </Field>
                    <br></br>

                    <label>Date:</label>
                    <ErrorMessage name="date" component="span" />
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

                    <button type="submit">Valider</button>
                </Form>
            </Formik>

            {created ? <Redirect to = "/"/> : console.log("User not logged")}

        </div>

    );
}

export default AjoutObjetTrouve;
