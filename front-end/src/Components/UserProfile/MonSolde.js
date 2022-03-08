import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as moment from "moment";
import i18n from "../../Translation/i18n";
import {UserContext} from "../Authentification/UserContext";
import {getUser, getHistorique} from "../../Actions/UserAction";
import Stack from '@mui/material/Stack';
import { styled } from '@material-ui/core/styles';
import { Button, Paper, Divider, Grid, Card, CardActions, CardContent, Box, Typography, ListItem, ListItemText, ListItemAvatar, Avatar, List,} from '@material-ui/core';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const MonSolde = () => {

    let user = useSelector((state) => state.UserReducer.getUserResponse);
    let hists = useSelector((state) => state.UserReducer.getHistoriqueResponse);
    const dispatch = useDispatch();
    const [solde, setSolde] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [historiquePoints, setHistoriquePoints] = useState([]);
    const [historiqueTransactions, setHistoriqueTransactions] = useState([]);
    const userID = useContext(UserContext);

    //Récupérer le solde du user
    useEffect(async () => {
        if(userID)
        {
            console.log("Dans useEffect 1")
            dispatch(getUser(userID));
            dispatch(getHistorique(userID));
        }
    }, [userID])

    useEffect(async () => {
        //Récupération du solde
        if(user)
        {
            setSolde(user.solde);
            //Récupération du step
            setActiveStep(recuperationActiveStep(user.solde));
        }

        //Récupération de l'historique des points + historique des transactions
        if(hists)
        {
            setHistoriquePoints(hists);
            setHistoriqueTransactions(hists);
        }
    }, [user])


    //Récupération de l'active step à partir du solde de l'utilisateur
    function recuperationActiveStep(soldeuser)
    {
        let rtn = 0;
        while(soldeuser >= 100)
        {
            soldeuser = soldeuser/100;
            rtn = soldeuser;
        }
        return rtn;
    }

    //Créer une récompense
    async function convertir()
    {
        console.log("user_id", userID);
        if(userID) {
            const requestOptions = {
                port: 3001,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: userID,
                    date: moment(new Date()).format("YYYY-MM-DD"),
                    recompense_id: "1"
                })
            };
            await fetch('/listeRecompense', requestOptions)
                .then(response => response.json()
                    .then(data => window.alert(data.message + "https://www.mavieencouleurs.fr/")));
        }
    }


    function afficher_historiquePoints() {
        let result = historiquePoints.filter(obj => { return obj.type_historique === 1 });
        console.log("Results: ", result);
        return (
            <div>
                <Item>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {result ? result.map(item => {
                            console.log("item:", item);
                            return (
                                <div>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={item.categorieNom} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography={true}
                                            primary={
                                                <Box sx={{ bgcolor: "#c5e1a5", width: "100px", borderRadius:8 }}>
                                                    <Typography style={{ color: '#689f38', fontWeight:"bold", textAlign:"center" }}>
                                                        {("+".concat(item.valeur_pos.toString())).concat(" ", i18n.t('monSolde.points'))}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={(moment(item.date).format('LL'))}
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>)
                        })
                        :
                            <h5 style = {{marginTop: '4vh', marginLeft: '5vh'}}>{i18n.t('monSolde.emptyHistory')}</h5>
                        }
                    </List>
                </Item>
            </div>
        );
    }

    function afficher_historiqueTransactions()
    {
        let result = historiqueTransactions.filter(obj => { return obj.type_historique === 0 });
        console.log("Results: ", result);
        return (
            <div>
                <Item>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {result ? result.map(item => {
                            console.log("item:", item);
                            return (
                                <div>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={item.intituleRecompense}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography={true}
                                            primary={
                                                <Box sx={{ bgcolor: "#ffa4a2", width: "100px", borderRadius:8 }}>
                                                    <Typography style={{ color: '#d32f2f', fontWeight:"bold", textAlign:"center" }}>
                                                        {("-".concat(item.valeur_neg.toString())).concat(" ", i18n.t('monSolde.points'))}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={(moment(item.date).format('LL'))}
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                            )
                        })
                        :
                            <h5 style = {{marginTop: '4vh', marginLeft: '5vh'}}>{i18n.t('monSolde.emptyTransactions')}</h5>
                        }
                    </List>
                </Item>
            </div>
        );
    }



    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(5),
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: 'none',
    }));

    const steps = [
        '0 points',
        '100 points',
        '200 points',
        '300 points',
        '400 points'
    ];


    return (
        <div>
            <Stack direction="column" spacing={2}>
                <Item style = {{backgroundColor : '#aad7ef'}}>
                    <h1> {solde} {i18n.t('monSolde.points')} </h1>

                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Item>
            </Stack>

            <Stack
                direction="row"
                style={{marginTop:"10px"}}
                spacing={45}
                divider={<Divider orientation="vertical" flexItem/>}
            >

                <Grid container spacing={2} columns={2}>
                    {/*Historique des points*/}
                    <Grid item xs={6}>
                        <Item>
                            <h2 style = {{marginLeft: '5vh'}}>{i18n.t('monSolde.historicPoints')}</h2>
                            <h5 style = {{marginLeft: '5vh'}}>{i18n.t('monSolde.historicPointsDescription')}</h5>
                            { historiquePoints ? afficher_historiquePoints() : null }
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <h2 style = {{marginLeft: '5vh'}}>{i18n.t('monSolde.transactions')}</h2>
                            <h5 style = {{marginLeft: '5vh'}}>{i18n.t('monSolde.transactionsDescription')}</h5>
                            { historiqueTransactions ? afficher_historiqueTransactions() : null }
                        </Item>
                    </Grid>
                </Grid>
            </Stack>


            <br/>

            <h1 style = {{marginLeft: '30vh'}}> Mes avantages </h1>

            <Grid container style={{backgroundColor:'#e6e6fa'}}>
                <Grid item xs={2} style = {{margin : '1vh', marginLeft: '30vh'}}>
                    <Card sx={{ minWidth:200 }}>
                        <CardContent style = {{backgroundColor : '#aad7ef'}}>
                            <Typography variant="h5" component="div">
                                {i18n.t('monSolde.advantage')}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {i18n.t('monSolde.advantageDescription')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>convertir()}>{i18n.t('monSolde.convertPoints')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default MonSolde;