import React from "react";
import {Paper,Grid,Typography,Button,Box} from "@material-ui/core/";
import {Link} from 'react-router-dom';

function LoginCards() {  
    return (
    <>
    <Box m={1}>
        <Grid container spacing={1} justify="center" >
            <Grid item>
            <Paper>
                <Box p={1}>
                <Typography variant="h5">
                    Admin Login
                </Typography>
                <ul>
                    <li>Can add Admins</li>
                    <li>Can remove Admins</li>
                    <li>Owner of the contract can tranfer his ownership</li>
                </ul>

                </Box>
            </Paper>
            <Grid container justify="space-evenly">
                <Grid item>
                    <Box mt={1}>
                        <Button variant="contained" color="primary" component={Link} to="/admin">Login</Button>
                    </Box>
                </Grid>
            </Grid>
            </Grid>

            <Grid item >
            <Paper>
                <Box p={1}>
                <Typography variant="h5">
                    Hospital Login
                </Typography>
                <ul>
                    <li>Can add patients</li>
                    <li>Can view patient's records with permission</li>
                    <li>Can add patient's records with permission</li>
                </ul>
                </Box>
            </Paper>
            <Grid container justify="space-evenly">
                <Grid item>
                    <Box mt={1}>
                        <Button variant="contained" color="primary" component={Link} to="/hospital">Login</Button>
                    </Box>
                </Grid>
            </Grid>
            </Grid>

            <Grid item >
            <Paper>
                <Box p={1}>
                <Typography variant="h5">
                    Patient Login
                </Typography>
                <ul>
                    <li>Can Sign/Login up as patient</li>
                    <li>Can view/add own records</li>
                    <li>Can grant/revoke permissions to add/view records</li>
                </ul>
                </Box>
            </Paper>
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    <Box mt={1}>
                        <Button variant="contained" color="primary" component={Link} to="/signup">Sign Up</Button>
                    </Box>
                </Grid>
                <Grid item>
                    <Box mt={1}>
                        <Button variant="contained" color="primary" component={Link} to="/patient">Login</Button>
                    </Box>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    </Box>
    </>
    );}
export default LoginCards;