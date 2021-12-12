import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";


const params = {
  country: "fr"
}

const Inscription = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const [iscreated, setcreated] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        email: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    useEffect( () => {
        console.log("On est dans Inscription.js");
    },[]);

    function onSubmit(values){
        if(!values.username || !values.email || !values.password){
        console.log("username:", values.username); return}
        const requestOptions = {
            port: 3001,
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: values.username, email: values.email, password: values.password})
        };
        fetch('/users', requestOptions)
            .then(response => response.json());

        window.alert("Votre compte a bien été créé!");
        setcreated(true);
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
                    
                    <label>email:</label>
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