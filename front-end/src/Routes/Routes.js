import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import AjoutObjetTrouve from '../Components/AjoutObjetTrouve';
import ChercherObjetPerdu from "../Components/ChercherObjetPerdu";
import Login from "../Components/Login";
import Inscription from "../Components/Inscription";

const Routes = () =>{
    return(
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/AjoutObjetTrouve" component={AjoutObjetTrouve} />
                <Route exact path="/ChercherObjetPerdu" component={ChercherObjetPerdu} />
                <Route exact path="/Inscription" component={Inscription} />
                <Route exact path="/Login" component={Login} />
            </Switch>
        </div>
    )
}

export default Routes;