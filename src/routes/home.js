import React, { Component } from 'react'
import Header from "../components/Header";
import {Card,CardContent,CardMedia,Grid,Typography,Box} from "@material-ui/core/";
import LoginCards from "../components/LoginCards";
import front from '../../src/assets/front.webp';

class Home extends Component {
    render(){
        return(
            <>
            <Header></Header>
            <Box m={0.5}>
                <Card>
                    <CardMedia image={front} style={{height:40,paddingBottom:'25%'}}></CardMedia>
                </Card>
            </Box>
            <Box p={-10}>
            <LoginCards/>
            </Box>
            </>
        );
    }
}
export default Home;