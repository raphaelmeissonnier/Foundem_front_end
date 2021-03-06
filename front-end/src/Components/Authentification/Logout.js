import React,{useEffect, useState} from "react";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";

const Logout = ()=>{

    const [redirected,setRedirected]= useState(false);
    
    console.log("Debut du Compnent")
    useEffect(async() => {
        console.log("Debut du UseEffect")

        let response = await fetch("/users/logout");
        let data = response.text;
        console.log("LOGOUT",data)

        cookie.remove("jwt", { expires: 1 });
        setRedirected(true);
    }, []);

    return (
    <div>{redirected ? <Redirect to = "/"/> : console.log("not redirect")}

    </div>);
}


export default Logout;