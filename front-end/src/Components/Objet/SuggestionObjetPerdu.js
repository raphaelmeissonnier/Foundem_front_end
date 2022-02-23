import React, { useState,useEffect,useContext } from "react";
import {UserContext} from "../Authentification/UserContext";
import {styled} from "@material-ui/core/styles";
import {Card, Paper} from "@material-ui/core";
import {CardContent, FormLabel, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import {Link} from "react-router-dom";
import i18 from "../../Translation/i18n";
import { PNG } from 'pngjs/browser';

const moment = require('moment')
const {config} = require('../../config');


const SuggestionObjetPerdu = (props) => {

    const mapboxApiKey = config.MY_API_TOKEN;
    const [items2, setItems2] = useState([]);
    const [itemsSuggeres, setItemsSuggeres] = useState(null); //SOURCE DE PB ??
    const userId = useContext(UserContext);
    const cheminImg = "./public/"
    
 //"D:/MIAGE NANTERRE/M1/projetDevOps/Foundem_back_end/perdupn_back_end/public/"
    let longitude = props.longitude;
    let latitude = props.latitude;

    useEffect(async () => {
        //Récupération des objets suggérés
        let responseSugg = await fetch("/objetsperdus/suggestions/"+userId);
        let dataSugg = await responseSugg.json();
        setItemsSuggeres(dataSugg);
        console.log("SuggestionObjetPerdu - apres le fetch: ",dataSugg);
    }, [longitude,latitude,userId]);

    useEffect( async () => {
        if(itemsSuggeres) {
            console.log("On remplit items2: ", itemsSuggeres);
            setItems2(await recuperationLieu(itemsSuggeres));
            console.log("SuggestionObjetsPerdus.js - items2: ", items2);
        }
    }, [itemsSuggeres])

    async function recuperationLieu(listeOjets)
    {
        let tableau = [];
        for (var i = 0; i < listeOjets.length; i++) {
            var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + listeOjets[i].longitude + "," + listeOjets[i].latitude + ".json?access_token=" + mapboxApiKey)
            var repAddr = await addr.json();
            tableau[i] = [listeOjets[i], repAddr.features[2].place_name]
        }
        return tableau;
    }

    /*async function afficheImage(results) {
        console.log("RESULT", results.data)
        const base64String = btoa(String.fromCharCode(...new Uint8Array(results.data)));  
        var str = `data:image/png;base64,${base64String}`
        console.log("IMAGE converti",base64String)
        console.log("STR",str.toString('ascii'))
        return str
        
        
    }*/

    const Item = styled(Paper)(({ theme }) => ({}));

    return(
        <Item elevation={8} style={{width:'30%', marginLeft:'10px', marginRight:'10px', marginBottom:'10px', marginTop:'10px'}}>
            <div style={{textAlign:'center'}}>
                <FormLabel style={{color:'black', fontFamily:'Trebuchet MS', fontSize:'18px', marginTop:'5px'}}>{i18.t('suggestionObjetPerdu.title')}</FormLabel>
            </div>
            {items2 !=null ? items2.map(item =>{
                return(
                    <div style={{marginLeft:'auto', marginRight:'auto', width:'90%'}}>
                        <Card style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px", marginTop:'10px', marginBottom:'10px'}}>
                            <CardContent>
                                <Typography paragraph={true} component="h6" style={{ textAlign:'justify', color:'black', fontFamily:'Trebuchet MS', fontSize:'16px', fontWeight:"bold"}}>{_.capitalize(item[0].intitule)}</Typography>
                                <Typography style={{ textAlign:'justify', color:'black', fontFamily:'Trebuchet MS', fontSize:'14px'}}>{_.capitalize(item[0].description) }</Typography>
                                <Typography style={{ textAlign:'justify', color:'black', fontFamily:'Trebuchet MS', fontSize:'14px'}}>{i18.t('suggestionObjetPerdu.lostOn')} {(moment(item[0].date).format('DD/MM/YYYY'))}</Typography>
                                <Typography style={{ textAlign:'justify', color:'black', fontFamily:'Trebuchet MS', fontSize:'14px'}}>{(item[1])}</Typography>
                                {item[0].img ? <img src={cheminImg+item[0].img} alt="img"/> : null}
                                <Link to="/ChercherObjetPerdu"><Button variant="contained" color="primary" style={{ marginTop:'10px', fontFamily:'Trebuchet MS', float:'right', marginBottom:'10px'}}>{i18.t('suggestionObjetPerdu.foundIt')}</Button></Link>
                            </CardContent>
                        </Card>
                    </div>
                )})
                : null
            }
        </Item>
      )
}

export default SuggestionObjetPerdu;