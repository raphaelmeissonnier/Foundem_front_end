import React, {useContext} from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import ChercherObjetPerdu from "../Components/Objet/ParcoursMatching/ChercherObjetPerdu";
import Login from "../Components/Authentification/Login";
import Inscription from "../Components/Authentification/Inscription";
import Logout from "../Components/Authentification/Logout";
import ObjetsMatche from '../Components/Objet/ParcoursMatching/ObjetsMatche';
import MesObjets from '../Components/UserProfile/MesObjets';
import AjouterObjet from '../Components/Objet/AjoutObjet/AjouterObjet';
import {UserContext} from "../Components/Authentification/UserContext";
import Agenda from "../Components/Objet/ParcoursMatching/Agenda";
import MesRdv from "../Components/UserProfile/MesRdv";
import MonSolde from "../Components/UserProfile/MonSolde";
import MonObjet from "../Components/Objet/MonObjet";
import Profil from "../Components/UserProfile/Profil";

import UserProfile from "../Components/UserProfile";


const Routes = () =>{

    const userID = useContext(UserContext);
    return(
        <div>
            <Switch>
                {userID ? 
                <Switch> 
                    <Route exact path="/" component={App} />
                    <Route exact path="/Logout" component={Logout} />
                    <Route exact path="/MesObjets" component={MesObjets} />
                    <Route exact path="/AjouterObjetPerdu" render={() => <AjouterObjet objet={'perdu'}/>} />
                    <Route exact path="/AjouterObjetTrouve" render={() => <AjouterObjet objet={'trouve'}/>} />
                    <Route exact path="/ObjetsMatche/:idObjet" component={ObjetsMatche} />
                    <Route exact path="/ChercherObjetPerdu" component={ChercherObjetPerdu} />
                    <Route exact path="/Agenda/:idObjetmatche/:firstUser/:secondUser" component={Agenda} />
                    <Route exact path="/MesRdv" component={MesRdv} />
                    <Route exact path="/MonSolde" component={MonSolde} />
                    <Route exact path="/MonObjet/:idObjet/:statusObjet" component={MonObjet} />
                    <Route exact path="/Profil" component={Profil} />
                    <Route exact path="/UserProfile/:id_utilisateur" component={UserProfile} />
                </Switch> :
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/Inscription" component={Inscription} />
                    <Route exact path="/Login" component={Login} />
                </Switch>
            }
                
               
            </Switch>
        </div>
    )
}


export default Routes;
