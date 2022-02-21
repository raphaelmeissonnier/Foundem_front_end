import React, {useContext, useEffect, useState} from "react";
import { Box, Button } from '@material-ui/core';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import {getUser} from "../../Actions/UserAction";
import "./style.css";
import { Row,Col, Form } from "react-bootstrap";
import { ErrorMessage } from "formik";

const Profil = () => {

const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [pic, setPic] = usestate();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [picMessage, setPicMessage] = useState();

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
    <input type="file" onChange={handleChange} />
                            <button onClick={handleClick}> Upload </button>
                             <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt= "Avatar" className="avatar"></img>
    
    <div>
    
        <Row className='profileContainer'>

            <Col md={6}>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                    ></Form.control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control
                        type="email"
                        placeholder="Entrez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control></Form.Group>
                    <Form.Group controlId="password">
                    <Form.Label> Password </Form.Label>
                    <Form.Control

                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control

                    type="password"
                    placeholder="Entrez votre mot de passe à nouveau"
                    value={password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant= "danger">{picMessage}</ErrorMessage>   
                    )}

                    <Form.Group controlId="pic">
                        <Form.Label> Changez votre photo de profil !</Form.Label>
                        <Form.File
                            onChange={(e) => postDetails(e.target.files[0])}
                            id="custom-file"
                            type="image/png"
                            labem="Upload Profile Picture"
                            custom
                            />
                    </Form.Group>

                    <Button type="submit" varient="primary">
                        Update
                    </Button>

                        

                </Form>

                <img src={pic} alt= {name} className="profilePic"/>
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