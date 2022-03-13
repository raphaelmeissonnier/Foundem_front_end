import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import i18n from "../../Translation/i18n";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import {Snackbar} from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Alert} from "@mui/material";

const Inscription = () => {

    const [iscreated, setcreated] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;


    //Valeurs initiales des champs du formulaire
    const initialValues = {
        name: "",
        firstName: "",
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(30).required(i18n.t('errorMessage.nameRequired')),
        firstName: Yup.string().min(3).max(30).required(i18n.t('errorMessage.firstNameRequired')),
        username: Yup.string().min(3).max(15).required(i18n.t('errorMessage.usernameRequired')),
        email: Yup.string().email().required(i18n.t('errorMessage.emailRequired')),
        password: Yup.string().min(4).max(20).required(i18n.t('errorMessage.passwordRequired')),
    })

    function onSubmit(values){
        console.log("On entre dans la fonction onSubmit")
        //Si au moins un des champs n'est pas saisi
        if(!values.username || !values.email || !values.password){
            console.log("Inscription.js - Parameters required");
            return;
        }
        console.log("On va lancer le fetch");
        const requestOptions = {
            port: 3001,
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ nom: values.name, prenom: values.firstName, username: values.username, email: values.email, password: values.password})
        };
        fetch('/users', requestOptions)
            //Je récupère la réponse émise par le back
            .then(response => response.json()
                /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                  Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                */
                .then(data => data.result ? setOpenSuccess(true) : setOpenError(true)));
        //Snackbar réussite + Redirection vers connexion
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <div className="registration-form">
                    <Form>
                        <div className="title">
                            <h3>{i18n.t('inscription.title')}</h3>
                        </div>

                        <div className="form-group row">
                            <div className="form-icon">
                                <AccountCircleIcon fontSize={"large"}/>
                            </div>

                            <div className="form-group">
                                <ErrorMessage name="name" component="span" className="text-danger"/>
                                <Field
                                    className="form-control item"
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="name"
                                    placeholder={i18n.t('inscription.yourName')}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="firstName" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="firstName"
                                placeholder={i18n.t('inscription.yourFirstName')}
                            />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="username" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="username"
                                placeholder={i18n.t('inscription.yourUsername')}
                            />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="email" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="email"
                                placeholder={i18n.t('inscription.yourEmail')}
                            />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="password" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                type="password"
                                id="inputCreatePost"
                                name="password"
                                placeholder={i18n.t('inscription.yourPassword')}
                            />
                        </div>

                        <center>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-block create-account">{i18n.t('inscription.signUp')}</button>
                            </div>
                        </center>
                    </Form>
                    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSuccess} autoHideDuration={2000} onClose={() => {setOpenSuccess(false); setcreated(true) }}>
                        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
                            {i18n.t("inscription.successRegistration")}
                        </Alert>
                    </Snackbar>
                    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openError} autoHideDuration={2000} onClose={() => setOpenError(false)}>
                        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                            {i18n.t("inscription.errorRegistration")}
                        </Alert>
                    </Snackbar>
                </div>
            </Formik>
            {iscreated ? <Redirect to = "/Login"/> : console.log("not redirect")}
        </div>
    );
}
export default Inscription;