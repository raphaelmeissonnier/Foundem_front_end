import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import Principale from './Components/principale';
import Deuxième from './Components/deuxieme';
import Ajout_objT from './Components/ajout_objT';


function Monapp() {
  return(
    <Router>
         <Switch>
          <Route exact path="/" component={Principale}/>
          <Route path="/deuxième" component={Deuxième}/>
          <Route path="/ajout_objT" component={Ajout_objT}/>

       
         </Switch>
    </Router>
  )
}

export default Monapp