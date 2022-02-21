import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";
import { Row,Col, Form } from "react-bootstrap";
import { ErrorMessage } from "formik";

const Profil = () => {

const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [pic, setPic] = useState();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [picMessage, setPicMessage] = useState();

const user = useSelector((state) => state.UserReducer);

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


function handleChange(){

}

function handleClick(){

}

return (
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
    
    </div>);



}
export default Profil;