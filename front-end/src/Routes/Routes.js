import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Coucou from "../Components/Coucou";
import App from "../App";
import history from './History';
import AjoutObjetTrouve from '../Components/AjoutObjetTrouve';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/AjoutObjetTrouve" component={AjoutObjetTrouve} />
                </Switch>
            </Router>
        )
    }
}