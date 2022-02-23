import React from "react";
import { Switch, Route } from "react-router-dom";
import {useContext} from "react";

import App from "../App";
import ChercherObjetPerdu from "../Components/ChercherObjetPerdu";
import Login from "../Components/Login";
import Inscription from "../Components/Inscription";
import Logout from "../Components/Logout";
import ObjetsMatche from '../Components/ObjetsMatche';
import MesObjets from '../Components/MesObjets';
import Profil from '../Components/Profil';
import AjouterObjet from '../Components/AjouterObjet';
import {UserContext} from "../Components/UserContext";

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
                    <Route exact path="/Profil" component={Profil} /> 
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
