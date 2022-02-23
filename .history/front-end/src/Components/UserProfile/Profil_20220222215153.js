import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import i18n from "../../Translation/i18n";
import * as Yup from "yup";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Redirect } from "react-router-dom";
import { first } from "lodash";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";

const Profil = () => {

    const user = useSelector((state) => state.UserReducer.getUserResponse);
    const [firstName, setFirstname] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null);
    const [pic, setPic] = useState();
    const [picMessage, setPicMessage] = useState(null);
    const [iscreated, setiscreated] = useState(null)

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal} = state;


//Récupération des informations de l'utilisateur
useEffect(() => {
    if(user)
    {
        setFirstname(user.prenom);
        setName(user.nom);
        setUsername(user.username);
        setPassword(user.mdp);
        setEmail(user.email);
    }
})

function onSubmit(values) {

    
    if(!values.email || !values.username || !values.password){
        console.log("parametres requires")

    }

    else {
        const requestOptions = {
            port: 3001,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({nom: values.name, prenom: values.firstName, username: values.username, email: values.email, mdp: values.password})
        }

        fetch('/users/'+ user.id_utilisateur, requestOptions) 

         //Je récupère la réponse émise par le back
         .then(response => response.json()
         /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
           Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
         */
         .then(data => data.result ? setOpenSuccess(true) : setOpenError(true)));
        //Snackbar réussite + Redirection vers connexion

    }
}

const validationSchema = Yup.object().shape({

    username: Yup.string().min(3).max(15).required(i18n.t('errorMessage.usernameRequired')),
    email: Yup.string().email().required(i18n.t('errorMessage.emailRequired')),
    password: Yup.string().min(4).max(20).required(i18n.t('errorMessage.passwordRequired')),
})



const postDetails = (pics) => {

    if(!pics){
        return setPicMessage("Sélectionnez une image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "notezipper");
        data.append("cloud_name", "roadsidecoder");
        fetch("https://api.cloudinary.com/v1_1/roadsidecoder/image/upload" , {
            method: "post",
            body: data,
        })

        .then((res) => res.json())
        .then((data) => {

            console.log(data);
            setPic(data.url.toString());
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        return setPicMessage("Veuillez sélectionner une image");
    }
};


function handleChange(){

}

function handleClick(){

}

return (
    <div className="Mes objets">
    <div>
    
    <center><p> Bienvenue sur ton profil  ! </p>

    <Link to="/MesObjets">
    <Button
                                  variant="outlined"
                                  style={{
                                      borderRadius: 2,
                                      backgroundColor: "#5fa082",
                                      padding: "5px 20px",
                                      fontSize: "15px"
                                  }}
                                  variant="contained"
                              >
                                  Mes objets
                              </Button>
                          </Link>
                          </center>
    </div>
    <br></br>
    
    

    <center><p>Changez votre profil ici :</p>
    <p> Choisissez une nouvelle photo de profil : <input type="file" onChange={handleChange} />
                            <button onClick={handleClick}> Upload </button>
                             <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt= "Avatar" className="avatar"></img></p>
    
                             <div>
                             <Formik
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            initialValues={{firstName: firstName, name: name, password: password, email: email, username: username}}
            enableReinitialize={true}
        >
          
        
                <div className="registration-form">
                    <Form>
                        <div className="title">
                            <h3>{i18n.t('inscription.title')}</h3>
                        </div>

                        <div className="form-group row">
                            
                            <div className="form-icon" style={{flexDirection:"row"}}>
                               
                               <p><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt= "Avatar" className="avatar"></img>
                                <input type="file" onChange={handleChange} style = {{marginLeft:"20px"}}/></p>
                               
                            
                            </div>

                            <div className="form-group">
                                <ErrorMessage name="name" component="span" className="text-danger"/>
                                <Field
                                    className="form-control item"
                                    autoComplete="off"
                                    id="inputCreatePost"
                                    name="name"
                                    placeholder={i18n.t('inscription.yourName')}
                                    disabled={true}
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
                                disabled={true}
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
                                <button type="submit" className="btn btn-block create-account">{i18n.t('Modifiez')}</button>
                            </div>
                        </center>
                    </Form>
                    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSuccess} autoHideDuration={2000} onClose={() => {setOpenSuccess(false); setiscreated(true) }}>
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

  
    </center>

    </div>);



}
export default Profil;