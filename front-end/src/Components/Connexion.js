import React, { useState } from "react";

function Connexion(){

    return (
        <div className="Connection">
            <h1> Se connecter</h1>
            <input type ="text" placeholder="Username..."/>
            <input type ="text" placeholder="Password..."/>
            <button> Se connecter ! </button>
        </div>
    );
}

export default Connexion;