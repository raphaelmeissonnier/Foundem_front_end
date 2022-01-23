import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import AjoutObjetTrouve from '../Components/AjoutObjetTrouve';
import AjoutObjetPerdu from '../Components/AjoutObjetPerdu';
import ChercherObjetPerdu from "../Components/ChercherObjetPerdu";
import Login from "../Components/Login";
import Inscription from "../Components/Inscription";
import Logout from "../Components/Logout";
import Profil from "../Components/Profil";
import MesObjets from "../Components/MesObjets";
import Agenda from "../Components/Agenda";

const Routes = () =>{
    return(
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/AjoutObjetTrouve" component={AjoutObjetTrouve} />
                <Route exact path="/AjoutObjetPerdu" component={AjoutObjetPerdu} />
                <Route exact path="/ChercherObjetPerdu" component={ChercherObjetPerdu} />
                <Route exact path="/Inscription" component={Inscription} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Logout" component={Logout} />
                <Route exact path="/Profil" component={Profil} />
                <Route exact path="/MesObjets" component={MesObjets} />
                <Route exact path="/Agenda" component={Agenda} />
            </Switch>
        </div>
    )
}

export default Routes;