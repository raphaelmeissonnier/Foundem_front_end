import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import i18n from "../../Translation/i18n";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import {Avatar, Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";
import '../Authentification/style.css';
import "bootstrap/dist/css/bootstrap.css";


const Profil = () => {

    const user = useSelector((state) => state.UserReducer.getUserResponse);
    const [firstName, setFirstname] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null);
    const [image, setImage] = useState(null);
    const [iscreated, setiscreated] = useState(null)

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [stateSnack] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal} = stateSnack;


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
            body: JSON.stringify({nom: values.name, prenom: values.firstName, username: values.username, img: image, email: values.email, mdp: values.password})
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


function handleFileUpload(event){
    let reader = new FileReader();
    let file = event.target.files[0];
    if(file){
        console.log("EVENT",event.target.files[0].size)
        //On limite la taille des images choisis
        if(event.target.files[0].size>90000){
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
}

if (image){
    console.log("VALEUR IMG",image);

}

return (
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
                        <h3>{i18n.t('profil.title')}</h3>
                    </div>

                    <div className="form-group row">
                        <div className="form-icon">
                            {user ? 
                            <Avatar src={"/"+user.id_utilisateur+"_user_"+user.img} />:
                            null
                            }
                        </div>

                        <div className="form-group">
                            <input id="img" name="img" type="file" accept="image/*" onChange={handleFileUpload} className="form-control item" />
                        </div>

                        <div className="form-group">
                            <ErrorMessage name="name" component="span" className="text-danger"/>
                            <Field
                                className="form-control item"
                                autoComplete="off"
                                id="inputCreatePost"
                                name="name"
                                placeholder={i18n.t('profil.yourName')}
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
                            placeholder={i18n.t('profil.yourFirstName')}
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
                            placeholder={i18n.t('profil.yourUsername')}
                        />
                    </div>

                    <div className="form-group">
                        <ErrorMessage name="email" component="span" className="text-danger"/>
                        <Field
                            className="form-control item"
                            autoComplete="off"
                            id="inputCreatePost"
                            name="email"
                            placeholder={i18n.t('profil.yourEmail')}
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
                            placeholder={i18n.t('profil.yourPassword')}
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
                        {i18n.t("profil.successRegistration")}
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical, horizontal }} open={openError} autoHideDuration={2000} onClose={() => setOpenError(false)}>
                    <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                        {i18n.t("profil.errorRegistration")}
                    </Alert>
                </Snackbar>

            </div>
        </Formik>
            {iscreated ? <Redirect to = "/"/> : console.log("not redirect")}
    </div>);

}
export default Profil;