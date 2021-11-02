import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import AjoutObjetTrouve from '../Components/AjoutObjetTrouve';
import ChercherObjetPerdu from "../Components/ChercherObjetPerdu";

const Routes = () =>{
    return(
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/AjoutObjetTrouve" component={AjoutObjetTrouve} />
                <Route exact path="/ChercherObjetPerdu" component={ChercherObjetPerdu} />
            </Switch>
        </div>
    )
}

export default Routes;