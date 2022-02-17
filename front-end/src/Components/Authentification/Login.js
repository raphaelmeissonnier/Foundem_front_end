import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";
import i18n from "../../Translation/i18n";
import './style.css';
import "bootstrap/dist/css/bootstrap.css";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";


const Login =() =>{

    const [iscreated, setcreated] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal} = state;


    const initialValues = {
          username: "",
          password: "",
      };

    function onSubmit(values){
      //Si au moins un des champs n'est pas saisi
      if(!values.username || !values.password)
      {
          console.log("Login.js - Parameters required");
          return;
      }
      const requestOptions = {
          port: 3001,
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ username: values.username, password: values.password})
      };
      //J'envoie le username et le password au back-end : vérification matching username/password
      fetch('/users/login', requestOptions)
          //Je récupère la réponse émise par le back
          .then(response => response.json()
              /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil
              */
              .then(data => data.result ? setcreated(true): window.alert(data.msg)));
    }

    return (
        <div>
            <Formik
             initialValues={initialValues}
             onSubmit={onSubmit}
            >
                <div className="registration-form">
                    <Form className="formContainer">
                        <div className="title">
                            <h3>{i18n.t('connexion.login')}</h3>
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="username" component="span" className="text-danger" />
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="username"
                                placeholder="Votre pseudo"
                            />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="password" component="span" className="text-danger" />
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                type="password"
                                id="inputCreatePost"
                                name="password"
                                placeholder="Votre mot de passe"
                            />
                        </div>

                        <center>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-block create-account">{i18n.t('connexion.login')}</button>
                            </div>
                        </center>

                    </Form>
                </div>
            </Formik>

            {iscreated ?
                <Redirect to = "/"/>
                :
                <Snackbar anchorOrigin={{ vertical, horizontal }} open={openError} autoHideDuration={2000} onClose={() => setOpenError(false)}>
                    <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                        {i18n.t("inscription.errorRegistration")}
                    </Alert>
                </Snackbar>
            }

        </div>

    );

    }

export default Login;