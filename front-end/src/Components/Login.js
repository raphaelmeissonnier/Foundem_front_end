import React, {useState, useRef, Label, useEffect} from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import Geocoder from "react-mapbox-gl-geocoder";
import Header from './Header';

const {config} = require('../config');


const Login =() =>{

   const [iscreated, setcreated] = useState(false);

   const initialValues = {
          username: "",
          password: "",
      };

  function onSubmit(values){
          if(!values.username || !values.password){
          console.log("username:", values.username); return}
          const requestOptions = {
              port: 3001,
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({ username: values.username, password: values.password})
          };
          fetch('/users/login', requestOptions)
              .then(response => response.json());
          setcreated(true);
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

            {iscreated ? console.log("bravo logged") : console.log("not redirect")}

        </div>

    );

    }

export default Login;