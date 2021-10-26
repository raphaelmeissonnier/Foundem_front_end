import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import Accueil from './Components/Accueil';
import Ajout_objT from './Components/AjoutObjetTrouve';


function Monapp() {
  return(
    <Router>
         <Switch>
          <Route exact path="/" component={Accueil}/>
          <Route path="/ajout_objT" component={Ajout_objT}/>


         </Switch>
    </Router>
  )
}

export default Monapp