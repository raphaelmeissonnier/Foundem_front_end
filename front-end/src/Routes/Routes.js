import React, {useContext} from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import ChercherObjetPerdu from "../Components/ChercherObjetPerdu";
import Login from "../Components/Login";
import Inscription from "../Components/Inscription";
import Logout from "../Components/Logout";
import ObjetsMatche from '../Components/ObjetsMatche';
import MesObjets from '../Components/MesObjets';
import AjouterObjet from '../Components/AjouterObjet';
import {UserContext} from "../Components/UserContext";
import Agenda from "../Components/Agenda";
import MesRdv from "../Components/MesRdv";
import MonSolde from "../Components/MonSolde";
import Traduction from "../Components/Traduction"

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
                    <Route exact path="/Mesrdv" component={MesRdv} />
                    <Route exact path="/MonSolde" component={MonSolde} />
                    <Route exact path="/Traduction" component={Traduction} />
                </Switch> : 
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/Inscription" component={Inscription} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Traduction" component={Traduction} />
                </Switch>
            }
                
               
            </Switch>
        </div>
    )
}


export default Routes;
