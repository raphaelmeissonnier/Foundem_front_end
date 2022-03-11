import React, {useContext, useState} from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "bootstrap/dist/css/bootstrap.css";
import Geocoder from "react-mapbox-gl-geocoder";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Redirect} from "react-router-dom";
import {UserContext} from "../../Authentification/UserContext";
import * as moment from 'moment';
import i18n from '../../../Translation/i18n';
import "./style.css";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";

const {config} = require('../../../config');
const mapboxApiKey = config.MY_API_TOKEN;
const params = { country: "fr" };


const AjouterObjet =({objet}) =>{

    const [created, setCreated] = useState(false);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [image, setImage] = useState(null);
    const userId = useContext(UserContext);
    const viewport2 = { width: 400, height: 400 };
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    //Input pour le geocoder
    const MyInput = (props) => <input {...props} placeholder={i18n.t('ajoutObjet.address')} />

    //Contraintes de validation du formulaire
    const validationSchema = Yup.object().shape({
        intitule: Yup.string().min(3).max(15).required(i18n.t('ajoutObjet.fillField')),
        description: Yup.string().max(200),
        date: Yup.date().required(i18n.t('ajoutObjet.fillField')).min(moment().subtract(365, 'days').calendar()).max(moment(new Date()).format('yyyy-MM-DD')),
        categorie: Yup.string().required(i18n.t('ajoutObjet.fillField')),
        rayon: Yup.number().when("showRayon", {is: 'perdu', then: Yup.number().required(i18n.t('ajoutObjet.fillField'))}),
    })

    //Valures initiales des champs du formulaire
    const initialValues = {
        intitule: "",
        description: "",
        categorie: "",
        date: moment(new Date()).format('yyyy-MM-DD'),
        rayon:"",
        showRayon: objet
    }

    //Envoie des données vers back end après validation des données saisies
    function onSubmit(values){
        console.log("On entre dans la fonction onSubmit")
        if(userId)
        {
            if(values.intitule || values.date || values.categorie || longitude || latitude)
            {
                if(objet==="perdu")
                {
                    if(values.rayon)
                    {
                        //On ajoute un objet perdu
                        console.log("On va lancer le fetch");
                        const requestOptions = {
                            port: 3001,
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json',
                                'Accept': 'multipart/form-data'
                            },
                            body: JSON.stringify( {intitule: values.intitule, description: values.description, date: values.date, img: image, longitude: longitude, latitude: latitude, user_id: userId, categorie: values.categorie, rayon: values.rayon })
                        };
                        fetch('/objetsperdus', requestOptions)
                            //Je récupère la réponse émise par le back
                            .then(response => response.json()
                                /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                                  Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                                */
                                .then(data => data.result ? setOpenSuccess(true) : setOpenError(true)));
                    }
                    else
                    {
                        console.log("AjouterObjet.js - Parameters required");
                        return;
                    }
                }
                else
                {
                    //On ajoute un objet trouvé
                    console.log("On va lancer le fetch");
                    const requestOptions = {
                        port: 3001,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify( {intitule: values.intitule, description: values.description, date: values.date, img: image, longitude: longitude, latitude: latitude, user_id: userId, categorie: values.categorie })
                    };
                    fetch('/objetstrouves', requestOptions)
                        //Je récupère la réponse émise par le back
                        .then(response => response.json()
                            /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                              Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                            */
                             .then(data => data.result ? (window.alert(data.message), setCreated(true)): window.alert(data.message)));

                }
            }
            else
            {
                console.log("AjouterObjet.js - Parameters required");
                return;
            }
        }
        else
        {
            console.log("AjouterObjet.js - userId empty");
        }
    }

    //Récupération de la longitude et latitude à partir de l'adresse
    function onSelected(viewport, item){
        setLongitude(item.center[0])
        setLatitude(item.center[1])
    }

    function handleFileUpload(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        console.log("EVENT",event.target.files[0].size)
        //On limite la taille des images choisis
        if(event.target.files[0].size>100000){
            alert("Veuillez choisir une image moins lourde !");
            document.getElementById("img").value ="" ;
            return ;
        }
        reader.onloadend = () => {
            var nameImg = file.name
            console.log("NOM IMG", nameImg)
            setImage({
                img: reader.result,
                name: nameImg
            });
        };
        reader.readAsDataURL(file);
    }

    if (image){
        console.log("VALEUR IMG",image);

    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <div className="registration-form">
                    <Form className="formContainer">
                        <div className="title">
                            <h3>{objet === "perdu" ? i18n.t('ajoutObjet.titleLost') : i18n.t('ajoutObjet.titleFound') }</h3>
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="intitule" component="span" className="text-danger"/>
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="intitule"
                                placeholder={i18n.t('ajoutObjet.name')}
                                className="form-control item"
                            />
                        </div>

                        <div className="form-group">
                            <input id="img" name="img" type="file" accept="image/*" onChange={handleFileUpload} className="form-control item" />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="description" component="span" className="text-danger"/>
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="description"
                                placeholder={i18n.t('ajoutObjet.description')}
                                className="form-control item"
                            />
                        </div>

                        {/* Effets personnels = clés, lunettes, ...*/}
                        <div className="form-group">
                            <ErrorMessage name="categorie" component="span" className="text-danger"/>
                            <Field as="select" name="categorie" className="custom-select registration-form item">
                                <option value="Autres">{i18n.t('ajoutObjet.chooseCategory')}</option>
                                <option value="PORTEFEUILLE">{i18n.t('ajoutObjet.wallet')}</option>
                                <option value="PAPIERS">{i18n.t('ajoutObjet.documents')}</option>
                                <option value="BAGAGES">{i18n.t('ajoutObjet.bags')}</option>
                                <option value="ELECTRONIQUE">{i18n.t('ajoutObjet.hightech')}</option>
                                <option value="ENFANTS">{i18n.t('ajoutObjet.kidsItems')}</option>
                                <option value="VETEMENTS">{i18n.t('ajoutObjet.clothes')}</option>
                                <option value="EFFETS PERSONNELS">{i18n.t('ajoutObjet.personnalItems')}</option>
                            </Field>
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="date" component="span" className="text-danger"/>
                            <Field type="date" name="date" className="form-control item"/>
                        </div>

                        <div className="form-group">
                            <Geocoder
                                style={{backgroundColor:"blue"}}
                                mapboxApiAccessToken={mapboxApiKey}
                                hideOnSelect={true}
                                onSelected={onSelected}
                                viewport={viewport2}
                                updateInputOnSelect={true}
                                inputComponent={MyInput}
                                queryParams={params}
                            />
                        </div>

                        {objet === "perdu" ?(
                            <div className="form-group">
                                <ErrorMessage name="rayon" component="span" className="text-danger"/>
                                <Field as="select" name="rayon" className="custom-select registration-form item">
                                    <option value="Aucun">{i18n.t('ajoutObjet.chooseRadius')}</option>
                                    <option value="5">5 km</option>
                                    <option value="10">10 km</option>
                                    <option value="15">15 km</option>
                                    <option value="20">20 km</option>
                                </Field>
                            </div>):
                            null
                        }
                        <center>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-block create-account">{i18n.t('ajoutObjet.send')}</button>
                            </div>
                        </center>
                    </Form>
                </div>
            </Formik>

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSuccess} autoHideDuration={2000} onClose={() => {setOpenSuccess(false); setCreated(true) }}>
                <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
                    {i18n.t("ajoutObjet.successAdding")}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={openError} autoHideDuration={2000} onClose={() => setOpenError(false)}>
                <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                    {i18n.t("ajoutObjet.errorAdding")}
                </Alert>
            </Snackbar>

            {created ? <Redirect to = "/"/> : console.log("AjouterObjets.js - user not redirected")}

        </div>

    );
}

export default AjouterObjet;
