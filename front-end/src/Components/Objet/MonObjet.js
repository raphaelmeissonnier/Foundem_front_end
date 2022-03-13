import React, {useState, useEffect} from "react";
import {Avatar, Typography, Snackbar} from "@mui/material";
import i18n from "../../Translation/i18n";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {Alert} from "@mui/material";
import '../Authentification/style.css';
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from "yup";
import * as moment from "moment";
import { Redirect } from "react-router-dom";


const MonObjet = (props) => {

    const [objet, setObjets] = useState(null);
    const [objetID, setObjetID] = useState(null);
    const [intitule, setIntitule] = useState(null)
    const [description, setDescription] = useState(null)
    const [date, setDate] = useState(null)
    const [image, setImage] = useState(null);
    const [categorie, setCategorie] = useState(null)
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [iscreated, setiscreated] = useState(null)


    //Récupération des infos de l'objet
    useEffect(async () => {
        let response;
        if(props.match.params.statusObjet === "perdu")
        {
            response = await fetch('/objetsperdus/'+props.match.params.idObjet);
        }
        else
        {
            response = await fetch('/objetstrouves/'+props.match.params.idObjet);
        }
        let result = await response.json();
        setObjets(result);
    }, [])

    //Récupération de chaque champs de l'objet
    useEffect(() => {
        if(objet)
        {
            setObjetID(objet[0].id_objet);
            setIntitule(objet[0].intitule);
            setDescription(objet[0].description);
            setDate(moment(objet[0].dates).format('yyyy-MM-DD'));
            setImage(objet[0].img);
            setCategorie(objet[0].intitule_categorie);
        }
    }, [objet])
    
    async function onSubmit(values) {
        let response; 
        
        if(!values.intitule || !values.dates || !values.categorie){
            console.log("parametres required")
        }

        else {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({intitule: values.intitule, description: values.description, dates: values.dates, img: image })
            }
            
            //API Call selon le type de l'objet
            if(props.match.params.statusObjet === "perdu")
            {
                response = await fetch('/objetperdu/'+ objetID, requestOptions)
            }
            else 
            {
                response = await fetch('/objettrouve/'+ objetID, requestOptions)
            }
            let data = await response.json();
            if(data.result)
            {
                setOpenSuccess(true);
            }
            else
            {
                setOpenError(true);
            }
        }
    }

    function handleFileUpload(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        if(file){
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
                var output = document.getElementById("output");
                setImage({
                    img: reader.result,
                    name: nameImg
                });
                output.src = reader.result
            };
            reader.readAsDataURL(file);
        }
        else{
            return ;
        }  
    }

    if (image){
        console.log("VALEUR IMG",image);

    }

    const validationSchema = Yup.object().shape({
        intitule: Yup.string().min(3).max(20).required(i18n.t('errorMessage.intituleRequired')),
        dates: Yup.date().required(i18n.t('errorMessage.dateRequired')).min(moment().subtract(365, 'days').calendar()).max(moment(new Date()).format('yyyy-MM-DD')),
    })


    return (
        <div>
            <Formik
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                initialValues={{intitule: intitule, description: description, dates: date, img: image, categorie: categorie}}
                enableReinitialize={true}
            >
                <div className="registration-form">
                    <Form>
                        <div className="title">
                            <h3>{i18n.t('monObjet.title')}</h3>
                        </div>

                        <div className="form-group row">
                            <div className="form-group">
                                <input id="img" name="img" type="file" accept="image/*" onChange={handleFileUpload} className="form-control item" placeholder="Votre image de l'objet " />
                                <h3><u>Image Associé </u>: </h3><br></br>
                                <img  id="output" width="500" height="300" src={"/"+image} /> 
                            </div>

                            <div className="form-group">
                                <ErrorMessage name="intitule" component="span" className="text-danger"/>
                                <Field
                                    className="form-control item"
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="intitule"
                                    //placeholder={i18n.t('profil.yourName')}
                                    //disabled={true}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="description" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="description"
                                //placeholder={i18n.t('profil.yourFirstName')}
                                //disabled={true}
                            />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="dates" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="dates"
                                type="date"
                                //placeholder={i18n.t('profil.yourUsername')}
                                disabled={true}
                            />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="categorie" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="categorie"
                                disabled={true}
                            />
                        </div>

                        <center>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-block create-account">{i18n.t('profil.update')}</button>
                            </div>
                        </center>
                    </Form>

                    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSuccess} autoHideDuration={2000} onClose={() => {setOpenSuccess(false); setiscreated(true) }}>
                        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
                            {i18n.t("monObjet.successUpdate")}
                        </Alert>
                    </Snackbar>
                    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openError} autoHideDuration={2000} onClose={() => setOpenError(false)}>
                        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                            {i18n.t("monObjet.errorUpdate")}
                        </Alert>
                    </Snackbar>

                </div>
            </Formik>
            {iscreated ? <Redirect to = "/"/> : console.log("not redirect")}
        </div>
    );

}

export default MonObjet;