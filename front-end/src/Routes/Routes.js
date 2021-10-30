import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "../App";
import AjoutObjetTrouve from '../Components/AjoutObjetTrouve';

const Routes = () =>{
    return(
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/AjoutObjetTrouve" component={AjoutObjetTrouve} />
            </Switch>
        </div>
    )
}

export default Routes;

