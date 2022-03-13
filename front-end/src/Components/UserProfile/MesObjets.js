import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../Authentification/UserContext";
import {getFoundItems, getLostItems, getMatchItems} from "../../Actions/ObjetsAction";
import * as moment from "moment";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import i18n from "../../Translation/i18n";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from "react-share";
import { List, ListItem, ListItemAvatar, ListItemText, Paper, Button, Typography} from '@mui/material';
import {styled} from "@material-ui/core/styles";
import _ from "lodash";
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const MesObjets  = () => {

    let objetsTrouvesResponse = useSelector((state) => state.ObjetsReducer.getFoundItemsResponse);
    let objetsPerdusResponse = useSelector((state) => state.ObjetsReducer.getLostItemsResponse);
    let objetsMatchesResponse = useSelector((state) => state.ObjetsReducer.getMatchItemsResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const [showFoundItems, setShowFoundItems] = useState(false);
    const [showLostItems, setShowLostItems] = useState(true);
    const [showMatchItems, setShowMatchItems] = useState(false);
    const [alignment,setAlignment]=useState('1');
    //const [value, setValue] = useState('1');
    const [accepted, setAccepted] = useState(false);
    const [ObjetMatche, setObjetMatche] = useState(null);
    const [secondUser, setsecondUser] = useState(null);


    useEffect(async () => {
        if(userID)
        {
            dispatch(getFoundItems(userID));
            dispatch(getLostItems(userID));
            dispatch(getMatchItems(userID));
        }
    }, [userID, showFoundItems])

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(5),
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: 'none',
    }));

    function handleClickFound()
    {
        setShowFoundItems(true);
        setShowLostItems(false);
        setShowMatchItems(false)
    }

    function handleClickLost()
    {
        setShowFoundItems(false);
        setShowMatchItems(false)
        setShowLostItems(true);
    }

    function handleClickMatch()
    {
        setShowMatchItems(true)
        setShowLostItems(false);
        setShowFoundItems(false);
    }

    const handleChange = (event, parValue) => {
        if(parValue=='1'){
            handleClickLost();
            setAlignment('1');
            //setValue('1')
        }
        else if (parValue=='2'){
            handleClickFound();
            setAlignment('2');
            //setValue('2')
        }
        else if (parValue=='3'){
            handleClickMatch();
            setAlignment('3');
            //setValue('3')
        }
      };

    async function accepter(idObjetTrouve)
    {
        //On récupère l'id de l'objet matché
        const idObjetMatche = await fetch('/objetsmatche/'+idObjetTrouve)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.id_objet_matche)));
        console.log("Accepter: ", idObjetMatche);

        setObjetMatche(idObjetMatche);

        const idObjetPerdu = await fetch('/objetsmatche/'+idObjetTrouve)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.objet_perdu)));
        console.log("Accepter: ", idObjetPerdu);


        //On récupère l'id du second utilisateur
        const idSecondUser = await fetch('/objetsperdus/'+idObjetPerdu)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.utilisateur)));

        setsecondUser(idSecondUser);

        //On redirige l'utilisateur vers l'agenda (en passant dans la route l'id de l'objet matché
        setAccepted(true);
    }

    async function refuser(idObjetTrouve)
    {
        //On récupère l'id de l'objet perdu associé à l'objet trouvé matché
        const idObjetPerdu = await fetch('/objetsmatche/'+idObjetTrouve)
            .then(response => response.json()
                .then(data => (data.result >= 0 ? data.message : data.objetperdu_id)));
        console.log("Refuser: ", idObjetPerdu);

        //On met à jour les états des objets perdus et trouvés
        const requestOptions = {
            port: 3001,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({etat: 1})
        };
        await fetch('/objetsperdus/' + idObjetPerdu, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetPerdu MAJ :", data.message)));
        await fetch('/objetstrouves/' + idObjetTrouve, requestOptions)
            .then(response => response.json()
                .then(data => console.log("ObjetTrouve MAJ :", data.message)));

        //On supprime le match
        await fetch('/objetsmatche/' + idObjetTrouve, {method: 'DELETE'})
            .then(response => response.json()
                .then(data => console.log("Delete match: ", data.message)))

        window.alert("Vous avez supprimé le match !");
        dispatch(getMatchItems(userID));
    }

    //Suppression d'un objet
    async function deleteObjet(id_objet, id_status)
    {
        console.log("id_status", id_status)
        const requestOptions = {
            port: 3001,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        };
        if(id_status == "perdu")
        {
            await fetch('/objetsperdus/' + id_objet, requestOptions)
                .then(response => response.json()
                    .then(data => console.log("Delete match: ", data.message)))
        }
        else
        {
            await fetch('/objetstrouves/' + id_objet, requestOptions)
                .then(response => response.json()
                    .then(data => console.log("Delete match: ", data.message)))
        }
        dispatch(getFoundItems(userID));
        dispatch(getLostItems(userID));
    }

    //J'affiche ces objets trouvés selon leur état
    function afficher(items)
    {
        return(
            <div>
                <Item>
                    <List sx={{ width: '100%' }}>
                        {items ? items.map(item => {
                                console.log("item:", item);
                                return (
                                    <div>
                                        <ListItem
                                            key={item.id_rdv}
                                        >
                                            <ListItemAvatar>
                                                <CategoryIcon fontSize="large"/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                disableTypography={true}
                                                primary={
                                                    <Typography style={{ fontWeight:"bold" }}>
                                                        {_.capitalize(item.intitule)}
                                                        {showLostItems || showFoundItems ?
                                                            <div>
                                                                <Link to={{pathname: '/MonObjet/'+ item.id_objet + '/' + item.status_objet}}>
                                                                    <EditIcon fontSize="small" color="action" style={{marginLeft:"20px"}}/>
                                                                </Link>
                                                                <Button onClick={() => deleteObjet(item.id_objet, item.status_objet)}>
                                                                    <DeleteIcon fontSize="small" color="error"/>
                                                                </Button>
                                                            </div>
                                                        : null }
                                                    </Typography>
                                                }
                                                secondary={
                                                    <div>
                                                        <Typography >
                                                            {_.capitalize(item.description)}
                                                        </Typography>
                                                        <Typography>
                                                            {_.capitalize(item.intitule_categorie)}
                                                        </Typography>
                                                        <Typography>
                                                            {moment(item.date).format("L")}
                                                        </Typography>
                                                        <Typography>
                                                            {_.capitalize(item.etat)}
                                                        </Typography>

                                                        {showMatchItems && item.etat=="en cours" ?
                                                            <div>
                                                                <Button variant="contained" style={{backgroundColor:'#689f38', color:"white"}} onClick={() => accepter(item.id_objet)}>{i18n.t('mesObjets.accept')}</Button>
                                                                <Button variant="contained" style={{backgroundColor:'#d32f2f', color:"white"}} value={item.id_objet} onClick={() => refuser(item.id_objet)}>{i18n.t('mesObjets.decline')}</Button>
                                                            </div>
                                                        : null }
                                                        {showLostItems ?
                                                            <div>
                                                                <FacebookShareButton
                                                                    url={"https://raphaelmeissonnier.github.io/Foundem_back_end/"}
                                                                    quote={"J'ai perdu cet objet : "+_.capitalize(item.description)+" le "+moment(item.date).format("L")+ ", l'avez-vous vu ?"}
                                                                    hashtag={"#Foundem"}
                                                                    description={"objet perdu"}
                                                                >
                                                                    <FacebookIcon size={32} round />
                                                                </FacebookShareButton>
                                                                <TwitterShareButton
                                                                    url={"https://raphaelmeissonnier.github.io/Foundem_back_end/"}
                                                                    quote={"J'ai perdu cet objet : "+_.capitalize(item.description)+" le "+moment(item.date).format("L")+ ", l'avez-vous vu ?"}
                                                                    hashtag={"#Foundem"}
                                                                    description={"objet perdu"}
                                                                >
                                                                    <TwitterIcon size={32} round />
                                                                </TwitterShareButton>
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
                            <h5 style = {{marginTop: '4vh', marginLeft: '5vh'}}>{i18n.t('mesObjets.itemsNotFound')}</h5>
                        }
                    </List>
                </Item>
            </div>
        )
    }
    
    return(
        <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h1>Mes Objets</h1>
            <center>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton value="1">{i18n.t('mesObjets.myLostItems')}</ToggleButton>
                <ToggleButton value="2">{i18n.t('mesObjets.myFoundItems')}</ToggleButton>
                <ToggleButton value="3">{i18n.t('mesObjets.myMatchItems')}</ToggleButton>
            </ToggleButtonGroup>
            </center>
            <br></br>
            <Divider></Divider>
            <br></br>
            {showFoundItems ? afficher(objetsTrouvesResponse) :  null }
            {showMatchItems ? afficher(objetsMatchesResponse) : afficher(objetsPerdusResponse)}
            <br></br>
            <Divider></Divider>
            <br></br>

            {accepted ? <Redirect to = {{pathname: '/Agenda/'+ObjetMatche +"/" + userID + "/" + secondUser}}/> : console.log("pas de redirection")}
        </div>
    )
}

export default MesObjets;