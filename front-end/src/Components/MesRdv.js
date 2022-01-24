import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "./UserContext";
import {getMesRdv} from "../Actions/MesRdvAction";

const MesRdv = () =>{

    let mesRdv = useSelector((state) => state.MesRdvReducer.getRdvResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();

    useEffect(async () => {
        if(userID)
        {
            dispatch(getMesRdv(userID));
        }
    }, [userID])




}

