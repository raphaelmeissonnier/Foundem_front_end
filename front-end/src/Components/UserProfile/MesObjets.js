import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {UserContext} from "../Authentification/UserContext";
import {getFoundItems, getLostItems, getMatchItems} from "../../Actions/ObjetsAction";
import _, { random } from "lodash";
import * as moment from "moment";
import {tableStyle, tdStyle, thStyle, trHoverStyle, trChildStyle} from "../Objet/AjoutObjet/styles";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import {Redirect} from "react-router-dom";
import i18n from "../../Translation/i18n";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon,
TwitterIcon} from "react-share";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';


const MesObjets  = () => {

    let objetsTrouvesResponse = useSelector((state) => state.ObjetsReducer.getFoundItemsResponse);
    let objetsPerdusResponse = useSelector((state) => state.ObjetsReducer.getLostItemsResponse);
    let objetsMatchesResponse = useSelector((state) => state.ObjetsReducer.getMatchItemsResponse);
    const userID = useContext(UserContext);
    const dispatch = useDispatch();
    const [showFoundItems, setShowFoundItems] = useState(false);
    const [showLostItems, setShowLostItems] = useState(false);
    const [showMatchItems, setShowMatchItems] = useState(false);
    const [alignment,setAlignment]=useState('1');
    const [value, setValue] = useState('1');
    const [accepted, setAccepted] = useState(false);
    const [ObjetMatche, setObjetMatche] = useState(null);
    const [secondUser, setsecondUser] = useState(null);

    const shareButtonProps = {
        url: "https://github.com/greglobinski/react-custom-share",
        network: "Facebook",
        text: "Give it a try - react-custom-share component",
        longtext:
          "Social sharing buttons for React. Use one of the build-in themes or create a custom one from the scratch."
      };

    useEffect(async () => {
        if(userID)
        {
            dispatch(getFoundItems(userID));
            dispatch(getLostItems(userID));
            dispatch(getMatchItems(userID));
        }
    }, [userID, showFoundItems])

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
            setValue('1')
        }
        else if (parValue=='2'){
            handleClickFound();
            setAlignment('2');
            setValue('2')
        }
        else if (parValue=='3'){
            handleClickMatch();
            setAlignment('3');
            setValue('3')
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
        window.location.reload(true);
    }

    //J'affiche ces objets trouvés selon leur état
    function afficher(items)
    {
        if(items != null )
        {
            return(
                <div>
                    <table style={tableStyle}>
                        <thead>
                        <tr style={trHoverStyle}>
                            <th style={thStyle}>{i18n.t('chercherObjet.name')}</th>
                            <th style={thStyle}>{i18n.t('chercherObjet.description')}</th>
                            <th style={thStyle}>{i18n.t('chercherObjet.category')}</th>
                            <th style={thStyle}>{i18n.t('chercherObjet.date')}</th>
                            <th style={thStyle}>{i18n.t('mesObjets.status')}</th>
                            {showLostItems ? <th style={thStyle}>{i18n.t('mesObjets.share')}</th> : null}
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => {
                            return(
                                <tr style={trChildStyle} key={random(999999999)}>
                                    <td style={tdStyle}> <Link to={{pathname: '/MonObjet/'+item.id_objet }}>{_.capitalize(item.intitule)} </Link> </td>
                                    <td style={tdStyle}>{_.capitalize(item.description)}</td>
                                    <td style={tdStyle}>{_.capitalize(item.intitule_categorie)}</td>
                                    <td style={tdStyle}>{moment(item.date).format("L")}</td>
                                    <td style={tdStyle}>{_.capitalize(item.etat)}</td>
                                    {showMatchItems && item.etat=="en cours" ? <td style={tdStyle}><button onClick={() => accepter(item.id_objet)}>{i18n.t('mesObjets.accept')}</button> <button value={item.id_objet} onClick={() => refuser(item.id_objet)}>{i18n.t('mesObjets.decline')}</button></td> : null }
                                   {showLostItems ?
                                    <td style={tdStyle}>
                                        <FacebookShareButton
                                                url={"https://www.youtube.com/"}
                                                quote={"J'ai perdu cet objet : "+_.capitalize(item.description)+" le "+moment(item.date).format("L")+ ", l'avez-vous vu ?"}
                                                hashtag={"#Foundem"}
                                                description={"objet perdu"}

                                              >
                                                <FacebookIcon size={32} round />
                                         </FacebookShareButton>
                                        <TwitterShareButton
                                                url={"https://www.youtube.com/"}
                                                quote={"J'ai perdu cet objet : "+_.capitalize(item.description)+" le "+moment(item.date).format("L")+ ", l'avez-vous vu ?"}
                                                hashtag={"#Foundem"}
                                                description={"objet perdu"}

                                              >
                                                <TwitterIcon size={32} round />
                                         </TwitterShareButton>
                                        <EmailShareButton
                                                url={"https://www.youtube.com/"}
                                                quote={"J'ai perdu cet objet : "+_.capitalize(item.description)+" le "+moment(item.date).format("L")+ ", l'avez-vous vu ?"}
                                                hashtag={"#Foundem"}
                                                description={"objet perdu"}

                                              >
                                                <EmailIcon size={32} round />
                                         </EmailShareButton>

                                    </td> : null}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    {/*
                    <div>
                    {items.map(item => {
                    <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/images/objetimg.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {_.capitalize(item.intitule)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {_.capitalize(item.description)}
                              {moment(item.date).format("L")}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                          </CardActions>
                        </Card>
                        })}
                    </div>
                    */}
                </div>
            );
        }
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
            {showFoundItems ? afficher(objetsTrouvesResponse) :  showMatchItems ? afficher(objetsMatchesResponse) : afficher(objetsPerdusResponse) }
            <br></br>
            <Divider></Divider>
            <br></br>

            {accepted ? <Redirect to = {{pathname: '/Agenda/'+ObjetMatche +"/" + userID + "/" + secondUser}}/> : console.log("pas de redirection")}
        </div>
    )
}

export default MesObjets;