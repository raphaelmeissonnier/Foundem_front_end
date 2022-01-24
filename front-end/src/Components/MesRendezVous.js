import React, {useEffect} from "react";
import {useSelector} from "react-redux";

const MesRendezVous = () =>{

    //CONNEXION A UN REDUCER
    let mesRdvResponse = useSelector((state) => state.RendezVousReducer);

    useEffect(async () =>{

    })
}

export default MesRendezVous;