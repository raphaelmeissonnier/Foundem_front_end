import React, {useContext, useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { styled } from '@material-ui/core/styles';
import { Paper, Divider, Grid, Card, CardMedia, CardActions, CardContent, Box,
Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import HaagenDazs from '../images/haagendazs.png';





function EspaceFidelite () {

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  backgroundColor: 'transparent',
    border: 'none'
}));

const steps = [
  '0 points',
  '100 points',
  '200 points',
  '300 points',
  '400 points'
];

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

    return (
        <div>
        <Stack direction="column" spacing={2}>
            <Item style = {{backgroundColor : '#aad7ef'}}>
                <h1 > 120 points </h1>

                <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
            </Item>
        </Stack>

        <Stack
           direction="row" spacing={45}
           divider={<Divider orientation="vertical" flexItem />}>

           <Grid container spacing={2} columns={10}>
           <Grid item xs={6}>

                <Item>
                 <h2 style = {{marginLeft: '5vh'}}> Historique des points </h2>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Téléphone" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary=" +10 points - 28 janvier 2021"/>
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Cartes" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="+30 points - 2 juillet 2021"/>
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Ordinateur" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="50 points - 28 décembre 2021"/>
                      </ListItem>
                    </List>
           </Item>
           </Grid>

           <Grid item xs={6}>
              <Item>
              <h2 style = {{marginLeft: '5vh'}}> Transactions effectuées </h2>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Téléphone" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary=" +10 points - 28 janvier 2021"/>
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Cartes" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="+30 points - 2 juillet 2021"/>
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Ordinateur" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="50 points - 28 décembre 2021"/>
                      </ListItem>
                    </List>

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
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
        </Card>
        </Grid>
    <Grid item xs={2} style = {{margin : '1vh'}}>
            <Card sx={{ minWidth:200 }}>
                  <CardContent style = {{backgroundColor : '#aad7ef'}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      adjective
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
            </Card>
            </Grid>

            <Grid item xs={2} style = {{margin : '1vh'}}>
                    <Card sx={{ minWidth:200 }}>
                          <CardContent style = {{backgroundColor : '#aad7ef'}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                              be{bull}nev{bull}o{bull}lent
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              adjective
                            </Typography>
                            <Typography variant="body2">
                              well meaning and kindly.
                              <br />
                              {'"a benevolent smile"'}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">Learn More</Button>
                          </CardActions>
                    </Card>
                    </Grid>

                    <Grid item xs={2} style = {{margin : '1vh'}}>
                            <Card sx={{ minWidth:200 }}>
                                  <CardContent style = {{backgroundColor : '#aad7ef'}}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                      Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                      be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                      adjective
                                    </Typography>
                                    <Typography variant="body2">
                                      well meaning and kindly.
                                      <br />
                                      {'"a benevolent smile"'}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <Button size="small">Learn More</Button>
                                  </CardActions>
                            </Card>
                            </Grid>


        </Grid>

        </div>
    )
}

export default EspaceFidelite;