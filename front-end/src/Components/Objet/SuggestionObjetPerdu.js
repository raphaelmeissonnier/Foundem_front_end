import React, { useState,useEffect,useContext } from "react";
import {UserContext} from "../Authentification/UserContext";
import {styled} from "@material-ui/core/styles";
import {Card, Paper} from "@material-ui/core";
import {CardContent, FormLabel, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import {Link} from "react-router-dom";
import i18 from "../../Translation/i18n";

const moment = require('moment')
const {config} = require('../../config');


const SuggestionObjetPerdu = (props) => {

    const mapboxApiKey = config.MY_API_TOKEN;
    var [items2] = useState([]);
    const userId = useContext(UserContext);

    var longitude = props.longitude;
    console.log("longitude", longitude);
    var latitude = props.latitude;
    console.log("latitude", latitude);

    useEffect(async () => {
        let responseSugg = await fetch("/objetsperdus/suggestions/"+userId);
        let dataSugg = await responseSugg.json();
        console.log("SuggestionObjetPerdu - apres le fetch: ",dataSugg)

        console.log("On remplit items2")
        items2.length=0;
        for(var i=0; i<dataSugg.length;i++){
            var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+dataSugg[i].longitude+","+dataSugg[i].latitude+".json?access_token="+mapboxApiKey)
            var repAddr = await addr.json();
            console.log("ADRESSE",repAddr);
            items2[i]=[dataSugg[i],repAddr.features[2].place_name]
        }
    }, [longitude,latitude,userId]);

    console.log("SuggestionObjetsPerdus.js - items2: ", items2);

    const Item = styled(Paper)(({ theme }) => ({}));

    return(
        <Item elevation={8} style={{width:'30%', marginLeft:'10px', marginRight:'10px', marginBottom:'10px', marginTop:'10px'}}>
            <div style={{textAlign:'center'}}>
                <FormLabel style={{color:'black', fontFamily:'Arvo', fontSize:20, marginTop:'5px'}}>{i18.t('suggestionObjetPerdu.title')}</FormLabel>
            </div>
            {items2.length>0 ? items2.map(item =>{
                return(
                    <div style={{marginLeft:'auto', marginRight:'auto', width:'90%'}}>
                        <Card style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px", marginTop:'10px', marginBottom:'10px'}}>
                            <CardContent>
                                <Typography style={{color:'black', fontFamily:'Arvo', fontSize:18, fontStyle:'bold'}}>{_.capitalize(item[0].intitule)}</Typography>
                                <Typography style={{color:'black', fontFamily:'Arvo', fontSize:15}}>{(item[0].description) }</Typography>
                                <Typography style={{color:'black', fontFamily:'Arvo', fontSize:15}}>{i18.t('suggestionObjetPerdu.lostOn')} {(moment(item[0].date).format('DD/MM/YYYY'))}</Typography>
                                <Typography style={{color:'black', fontFamily:'Arvo', fontSize:15}}>{(item[1])}</Typography>
                                <Link to="/ChercherObjetPerdu"><Button variant="contained" color="primary" style={{marginTop:'5px', float:'right', marginBottom:'10px'}}>{i18.t('suggestionObjetPerdu.foundIt')}</Button></Link>
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