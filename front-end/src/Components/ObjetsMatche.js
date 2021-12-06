import React, {useState, useEffect} from 'react';


const ObjetsMatche = () => {

    const [items, setItems] = useState([]);

    useEffect(async () => {
        console.log("On entre dans le useEffect");
        console.log('await');
        let response = await fetch("/objets/2.344/48.8987/2");
        console.log('await: ', await fetch("/objetsperdus/user/1"));
        //let response = await fetch("/objetsperdus/user/1");
        console.log("Response: ", response);
        let data = await response.json();
        console.log("Objets perdus de l'utlisateur 1",data)
        setItems(data);
    }, []);

    console.log("Items perdus de l'user: ", items);
    //ON RECUPERE LES OBJETS PERDUS DE L'UTILISATEUR

    return(
        <div>
        <br></br>
    <br></br>
    <br></br>
    <br></br>
        <h1>BIENVENUE</h1>
        </div>
    )

}

export default ObjetsMatche;