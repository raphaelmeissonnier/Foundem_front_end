import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";


const Inscription = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const [iscreated, setcreated] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        email: Yup.string().email(),
        password: Yup.string().min(4).max(20).required(),
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
            body: JSON.stringify({ username: values.username, email: values.email, password: values.password})
        };
        fetch('/users', requestOptions)
            //Je récupère la réponse émise par le back
            .then(response => response.json()
                /*Je regarde l'attribut 'result' de la variable 'response'(qui contient la réponse émise par le back)
                  Si l'attribut 'result'==0 alors je ne fais rien sinon je redirige l'user vers l'accueil + message
                */
                .then(data => data.result ? (window.alert(data.msg), setcreated(true)) : window.alert(data.msg)));
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
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                    autoComplete="off"
                    id="inputCreatePost"
                    name="username"
                    placeholder="Votre pseudo"
                    />
                    
                    <label>Email:</label>
                    <ErrorMessage name="email" component="span" />
                    <Field
                    autoComplete="off"
                    id="inputCreatePost"
                    name="email"
                    placeholder="Votre adresse-mail"
                    />

                    <label> Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                    autoComplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="password"
                    placeholder="Votre mot de passe"
                    />

                    <button type="submit"> S'inscrire</button>
                </Form>
            </Formik>
             {iscreated ? <Redirect to = "/"/> : console.log("not redirect")}
        </div>
    );
}
export default Inscription;