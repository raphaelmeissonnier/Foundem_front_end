import React, {useEffect, useState} from "react";
import {Avatar} from "@material-ui/core";
import '../Components/Authentification/style.css';
import "bootstrap/dist/css/bootstrap.css";
import {Typography} from "@mui/material";


const UserProfile = (props) => {

    const [user, setUser] = useState(null);
    const [firstName, setFirstname] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [img, setImg] = useState(null)


    useEffect(async () => {
        let response = await fetch('/users/'+props.match.params.id_utilisateur);
        let result = await response.json();
        setUser(result);
    })

    //Récupération des informations de l'utilisateur
    useEffect(() => {
        if(user)
        {
            setFirstname(user.prenom);
            setName(user.nom);
            setUsername(user.username);
            setEmail(user.email);
            setImg(user.img);
        }
    })


    return (
        <div>
            <div className="registration-form">

                <div className="form-group row">
                    <div className="form-icon">
                        <Avatar src={img} />
                    </div>

                    <div className="form-group">
                        <Typography className="form-control item">
                            {name}
                        </Typography>
                    </div>
                </div>

                <div className="form-group">
                    <Typography className="form-control item">
                        {firstName}
                    </Typography>
                </div>

                <div className="form-group">
                    <Typography className="form-control item">
                        {username}
                    </Typography>
                </div>

                <div className="form-group">
                    <Typography className="form-control item">
                        {email}
                    </Typography>
                </div>

            </div>
        </div>

    );
}
export default UserProfile;