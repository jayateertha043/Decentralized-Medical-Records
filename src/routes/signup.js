import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {Card,Grid,Box,Paper, Typography,TextField, Button,CircularProgress,MenuItem} from '@material-ui/core';
import Header from "../components/Header";
import InitialiseWeb3 from '../components/web3';

class Signup extends Component {
    DMR=null;account="";
    state={
        name:"Nil",
        phone:"Nil",
        gender:"male",
        dob:"Nil",
        bg:"Nil",
        allergy:"Nil",
        owner: "loading",
        account:"loading",
        sview:true,
        load:false
    }

    async componentWillMount() {
        let [dmr,accounts]=await InitialiseWeb3();
        this.DMR=dmr;
        this.account=accounts[0];
        let own = await this.DMR.methods.owner().call();
        await this.setState({owner:own,account:this.account});
        console.log("owner\t"+this.state.owner);
        console.log("Account\t"+this.state.account);
      }

    onnameChange = (event)=>{
        this.setState({name:event.target.value},()=>console.log(this.state.name));
    }
    onphoneChange = (event)=>{
        this.setState({phone:(event.target.value).toString()},()=>console.log(this.state.phone));
    }
    ongenderChange = (event)=>{
        this.setState({gender:event.target.value},()=>console.log(this.state.gender));
    }
    ondobChange = (event)=>{
        this.setState({dob:event.target.value.toString()},()=>console.log(this.state.dob));
    }
    onbgChange = (event)=>{
        this.setState({bg:event.target.value},()=>console.log(this.state.bg));
    }
    onallergyChange = (event)=>{
        this.setState({allergy:event.target.value},()=>console.log(this.state.allergy));
    }
    isLoad=()=>{
        if(this.state.load){
        return(
        <Box m={5}>
        <Grid container justify="center">
            <Grid item>
                <Box p={5} m={10}><CircularProgress/></Box>               
            </Grid>
        </Grid>
        </Box>
        );}
        return null;
    }
    signupView=()=>{
        if(this.state.sview){
        return(
            <Grid container justify="center">
            <Grid item>
                <Paper>
                    <Box p={2} m={5}>
                        <Box m={1} display="flex" justifyContent="Center" alignContent="center">
                            <Typography>
                                Register as Patient
                            </Typography>
                        </Box>

                        <Box>
                        <TextField label="Name" onChange={this.onnameChange}></TextField>
                        </Box>

                        <Box>
                        <TextField label="Phone" onChange={this.onphoneChange}></TextField>
                        </Box>
                        
                        <Box>
                        <TextField value={this.state.gender} label="Gender" select size="small" InputLabelProps={{ shrink: true }} onChange={this.ongenderChange}>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </TextField>
                        </Box>

                        <Box>
                        <TextField onChange={this.ondobChange} type="date" label="Date of Birth" format={'DD/MM/YYYY'} InputLabelProps={{ shrink: true }}></TextField>
                        </Box>
                        
                        <Box>
                        <TextField label="Blood Group" onChange={this.onbgChange}></TextField>
                        </Box>

                        <Box>
                        <TextField label="Allergies" onChange={this.onallergyChange}></TextField>
                        </Box>

                        <Box mt={3} display="flex" justifyContent="Center" alignContent="center">
                        <Button onClick={this.onSignup} style={{backgroundColor:"purple"}}>Sign Up</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        );}
        return null;
    }
    onSignup = async ()=>{
        await this.setState({sview:false,load:true});
        try{
        let result=await this.DMR.methods.addPatient(this.state.name,this.state.phone,this.state.gender,this.state.dob,this.state.bg,this.state.allergy).send({from:this.state.account});
        console.log(result);
        await this.setState({load:false,sview:true});
        alert("successfully registered user,Go to Home and Login again!!!")
        }
        catch(e){
            alert("Error");
            await this.setState({load:false,sview:true});
        }
    } 
    render(){
        return(
            <>
            <Header></Header>
            <Box m={1}>
                <Box m={1}><Card>Contract Owner:{"\t"+this.state.owner}</Card></Box>
                <Box m={1}><Card>Current Account:{"\t"+this.state.account}</Card></Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
        <Typography style={{color:"lime"}}>{"Already Registered User?"}</Typography>
             <Box ml={2} mr={2}>
             <Button variant="outlined" style={{color:"mintcream"}}
             component={Link}
             to="/patient"
             >Login Here</Button>
             </Box>
            </Box>
            <this.isLoad></this.isLoad>
            <this.signupView></this.signupView>
            </>
        );
    }
}

export default Signup;