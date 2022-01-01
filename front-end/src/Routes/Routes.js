import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import ChercherObjetPerdu from "../Components/ChercherObjetPerdu";
import Login from "../Components/Login";
import Inscription from "../Components/Inscription";
import Logout from "../Components/Logout";
import ObjetsMatche from '../Components/ObjetsMatche';
import MesObjets from '../Components/MesObjets';
import AjouterObjet from '../Components/AjouterObjet';

const Routes = () =>{
    return(
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/AjouterObjetPerdu" render={() => <AjouterObjet objet={'perdu'}/>} />
                <Route exact path="/AjouterObjetTrouve" render={() => <AjouterObjet objet={'trouve'}/>} />
                <Route exact path="/ObjetsMatche/:idObjet" component={ObjetsMatche} />
                <Route exact path="/ChercherObjetPerdu" component={ChercherObjetPerdu} />
                <Route exact path="/Inscription" component={Inscription} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Logout" component={Logout} />
                <Route exact path="/MesObjets" component={MesObjets} />
            </Switch>
        </div>
    )
}


export default Routes;
