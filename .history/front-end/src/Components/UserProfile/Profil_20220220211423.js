import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";
import "./style.css";
import { Row,Col, Form } from "react-bootstrap";
const Profil = () => {

const user = useSelector((state) => state.UserReducer);
const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;

const userUpdate = useSelector((state) => state.userUpdate);
const { loading, error, success } = userUpdate;



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

    <center><p>Changez votre profil ici :</p>
    <div>
        <p> Modifiez votre image de profil : <input type="file" onChange={handleChange} /></p>
        <button onClick={handleClick}> Upload </button>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt= "Avatar" className="avatar"></img>
    
        <Row className='profileContainer'>

            <Col md={6}>Form</Col>
            <Col>

            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
                
                </Col>



        </Row>
        <div>

</div>
    </div>
    
    </center>
    </div>);



}
export default Profil;