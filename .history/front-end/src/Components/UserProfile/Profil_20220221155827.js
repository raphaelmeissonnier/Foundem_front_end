import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Profil = () => {

const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [pic, setPic] = useState();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [picMessage, setPicMessage] = useState();

const user = useSelector((state) => state.UserReducer.getUserResponse);
useEffect(() => {

    setEmail(user.email)

})

useEffect(() => {

    setPassword(user.password)

})

useEffect(() => {

    setConfirmPassword(user.confirmPassword)

})

//const userLogin = useSelector((state) => state.userLogin);
//const { userInfo } = userLogin;
//const userUpdate = useSelector((state) => state.userUpdate);
//const { loading, error, success } = userUpdate;

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
    <div className="Mes objets">
    <div>
    
    <center><p> Bienvenue sur ton profil {user.username} ! </p>

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
    


  
    </center>

    </div>);



}
export default Profil;