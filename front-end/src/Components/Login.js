import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";


const Login =() =>{

   const [iscreated, setcreated] = useState(false);

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
            <br></br><br></br><br></br><br></br><br></br>
            <Formik
             initialValues={initialValues}
             onSubmit={onSubmit}
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

                    <label> Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                    autoComplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="password"
                    placeholder="Votre mot de passe"
                    />

                    <button type="submit"> Se connecter</button>
                </Form>
            </Formik>

            {iscreated ? <Redirect to = "/"/> : console.log("User not logged")}

        </div>

    );

    }

export default Login;