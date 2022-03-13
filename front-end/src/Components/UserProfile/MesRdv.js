import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../Authentification/UserContext";
import * as moment from "moment";
import {config} from "../../config";
import i18n from "../../Translation/i18n";
import {getRdv} from "../../Actions/UserAction";
import {
    Paper,
    Divider,
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
    List,
    Button,
    Grid,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { Link } from "react-router-dom";


const MesRdv = () => {

    let mesRdv = useSelector((state) => state.UserReducer.getRdvResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const mapboxApiKey = config.MY_API_TOKEN;
    const [items, setItems] = useState(null);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(5),
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: 'none',
    }));

    //Récupération des rdv
    useEffect(async () => {
        if (userID) {
            dispatch(getRdv(userID));
        }
    }, [userID])

    useEffect( async () => {
        if(mesRdv)
        {
            console.log("Mes rdv not null");
            let result = await recuperationLieu(mesRdv);
            setItems(result);
        }
    }, [mesRdv])
    
    //Récupération du lieu
    async function recuperationLieu(listeRdv) {
        let rdvLocal = [];
        for (var i = 0; i < listeRdv.length; i++) {
            var addr = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + listeRdv[i].longitude + "," + listeRdv[i].latitude + ".json?access_token=" + mapboxApiKey)
            var repAddr = await addr.json();
            console.log("ADRESSE", repAddr);
            listeRdv[i].place = repAddr.features[2].place_name;
            rdvLocal[i] = listeRdv[i];
        }
        return rdvLocal;
    }

    async function accepter(id_rdv, date, longitude, latitude) {
        if (id_rdv && date && longitude && latitude) {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    longitude: longitude,
                    latitude: latitude,
                    date: moment(date).format("YYYY-MM-DD"),
                    etat: "valide"
                })
            };
            await fetch('/users/' + userID + '/rdv/' + id_rdv, requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.msg)));
        } else {
            console.log("MesRdv.js - Parameters required");
        }
    }

    async function refuser(id_rdv, date, longitude, latitude) {
        if (id_rdv && date && longitude && latitude) {
            const requestOptions = {
                port: 3001,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    longitude: longitude,
                    latitude: latitude,
                    date: moment(date).format("YYYY-MM-DD"),
                    etat: "refuse"
                })
            };
            await fetch('/users/' + userID + '/rdv/' + id_rdv, requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.msg)));
        } else {
            console.log("MesRdv.js - Parameters required");
        }
    }


    function afficher()
    {
        return(
            <div>
                <Item>
                    <List sx={{ width: '100%' }}>
                        {items ? items.map(item => {
                                console.log("item:", item);
                                return (
                                    <div id={item.id_rdv}>
                                        <ListItem
                                            key={item.id_rdv}
                                        >
                                            <ListItemAvatar>
                                                <TodayRoundedIcon fontSize="large"/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                disableTypography={true}
                                                primary={
                                                    <Typography style={{ fontWeight:"bold" }}>
                                                        {moment(item.date_rdv).format("LL")}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <div>
                                                        <Typography>
                                                            {item.place}
                                                        </Typography>
                                                        <Link to={{ pathname:'/UserProfile/'+ item.id_utilisateur.toString() }}>
                                                            <Typography>
                                                                {i18n.t('mesObjets.foundBy')} {item.username}
                                                            </Typography>
                                                        </Link>
                                                        {item.etat === "en cours" ?
                                                            <div>
                                                                <Button variant="contained" style={{backgroundColor:'#689f38', color:"white"}} onClick={() => accepter(item.id_rdv, item.date_rdv, item.longitude, item.latitude)}>{i18n.t('mesObjets.accept')}</Button>
                                                                <Button variant="contained" style={{backgroundColor:'#d32f2f', color:"white"}} onClick={() => refuser(item.id_rdv, item.date_rdv, item.longitude, item.latitude)}>{i18n.t('mesObjets.decline')}</Button>
                                                            </div>
                                                        : null}
                                                    </div>
                                                }
                                            />

                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </div>)
                            })
                            :
                            <h5 style = {{marginTop: '4vh', marginLeft: '5vh'}}>{i18n.t('mesRdv.rdvNotFound')}</h5>
                        }
                    </List>
                </Item>
            </div>
        )
    }

    return (

        <Grid style={{alignSelf:"center"}} container columns={1}>
            {/*Historique des points*/}
            <Grid item xs={12}>
                <Item>
                    <h2 style={{marginLeft: '5vh'}}> {i18n.t('mesRdv.title')} </h2>
                    {items != null ? afficher() : console.log("mesRdv null")}
                </Item>
            </Grid>
        </Grid>
    )
}

export default MesRdv;