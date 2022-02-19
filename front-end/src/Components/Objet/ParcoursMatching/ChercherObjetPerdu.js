import React, {useContext, useState} from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../AjoutObjet/ajoutObjetTrouve.css'
import Geocoder from "react-mapbox-gl-geocoder"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {UserContext} from "../../Authentification/UserContext";
import * as moment from 'moment';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {tableStyle, tdStyle, thStyle, trHoverStyle, trChildStyle} from "../AjoutObjet/styles";
import i18n from "../../../Translation/i18n";

const _ = require("lodash");
const {config} = require('../../../config');
const mapboxApiKey = config.MY_API_TOKEN;
const params = { country: "fr" };


const ChercherObjetPerdu =() =>{

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [items, setItems] = useState([]);
    const userId = useContext(UserContext);

    const viewport2 = { width: 400, height: 400 };

    const initialValues = {
        intitule: "",
        categorie: "",
        date: moment(new Date()).format('yyyy-MM-DD'),
    }

    //Contraintes de validation du formulaire
    const validationSchema = Yup.object().shape({
        intitule: Yup.string().min(3, "Trop court").max(15).required("Veuillez saisir ce champs"),
        date: Yup.date().required("Veuillez saisir ce champs").min(moment().subtract(365, 'days').calendar(), "Date invalide").max(moment(new Date()).format('yyyy-MM-DD'), "Date invalide"),
        categorie: Yup.string().required("Veuillez saisir ce champs"),
    })

    //Récupération de la longitude et latitude à partir de l'adresse
    function onSelected(viewport, item){
        console.log("Item",item.place_name)
        console.log("Item",item)
        setLongitude(item.center[0])
        setLatitude(item.center[1])
        console.log("Item long",typeof(item.center[0]))
    }

    function afficher()
    {
        return(
            <div>
                <table style={tableStyle}>
                    <thead>
                    <tr style={trHoverStyle}>
                        <th style={thStyle}>{i18n.t('chercherObjet.name')}</th>
                        <th style={thStyle}>{i18n.t('chercherObjet.description')}</th>
                        <th style={thStyle}>{i18n.t('chercherObjet.category')}</th>
                        <th style={thStyle}>{i18n.t('chercherObjet.date')}</th>
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
                                <td style={tdStyle}><Link to={{pathname: '/ObjetsMatche/'+item.id }}><button>{i18n.t('chercherObjet.myItem')}</button></Link></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }


    function onSubmit(values){
        console.log("On entre dans la fonction onSubmit")
        if(userId)
        {
            //Si au moins un des champs n'est pas saisi
            if(!values.intitule || !values.date || !values.categorie || !longitude || !latitude)
            {
                console.log("ChercherObjetPerdu.js - Parameters required");
                return;
            }
            console.log("On va lancer le fetch");
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify( {intitule: values.intitule, description: values.description, date: values.date, longitude: longitude, latitude: latitude, user_id: userId, categorie: values.categorie })
            };
            fetch('/objetstrouves/recherche', requestOptions)
                //Je récupère la réponse émise par le back
                .then(response => response.json()
                    /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                      Si l'attribut 'result'==0 alors j'affiche un message rien sinon j'enregistre la réponse du back
                    */
                    .then(data => (setItems(data), data.result >=0 ? window.alert(data.message) : null )));
        }
        else
        {
            console.log("ChercherObjetPerdu.js - userId empty");
        }
    }
    console.log("ChercherObjetsPerdus.js - items: ", items[0]);

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
    }));
    const classes = useStyles();

    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br>

            <h1 className={classes.title}> {i18n.t('chercherObjet.titlePart1')} </h1>
            <br></br>
            <center>
                <p>{i18n.t('chercherObjet.titlePart2')}</p>
            </center>
            <br></br>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>{i18n.t('ajoutObjet.name')}</label>
                    <ErrorMessage name="intitule" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="intitule"
                        placeholder="Bonnet noir"
                    />
                    <br></br>

                    {/* Effets personnels = clés, lunettes, ...*/}
                    <label>{i18n.t('ajoutObjet.category')}</label>
                    <Field as="select" name="categorie">
                        <option value="Autres">{i18n.t('ajoutObjet.chooseCategory')}</option>
                        <option value="PORTEFEUILLE">{i18n.t('ajoutObjet.wallet')}</option>
                        <option value="PAPIERS">{i18n.t('ajoutObjet.documents')}</option>
                        <option value="BAGAGES">{i18n.t('ajoutObjet.bags')}</option>
                        <option value="ELECTRONIQUE">{i18n.t('ajoutObjet.hightech')}</option>
                        <option value="ENFANTS">{i18n.t('ajoutObjet.kidsItems')}</option>
                        <option value="VETEMENTS">{i18n.t('ajoutObjet.clothes')}</option>
                        <option value="EFFETS PERSONNELS">{i18n.t('ajoutObjet.personnalItems')}</option>
                    </Field>
                    <br></br>

                    <label>{i18n.t('ajoutObjet.date')}</label>
                    <ErrorMessage name="date" component="span" />
                    <Field type="date" name="date"/>
                    <br></br>

                    <label>{i18n.t('ajoutObjet.address')}</label>
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

                    <button type="submit">{i18n.t('chercherObjet.search')}</button>
                </Form>
            </Formik>

            <div>
                {items.length ? afficher() : null}
            </div>
        </div>
    );
}


export default ChercherObjetPerdu;