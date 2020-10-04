import {Chip,Card,Grid,Box,Paper, Typography,TextField, Button,CircularProgress,Dialog,DialogActions,DialogContent,DialogTitle} from '@material-ui/core';
import React, { Component} from 'react'
import Header from "../components/Header";
import InitialiseWeb3 from '../components/web3';


class Admin extends Component{
    DMR=null;account="";
    state={
        owner: "loading",
        account:"loading",
        addAddr: "",
        remAddr: "",
        chgOwner: "",
        addr:"",
        hname:"",
        hcontact:"",
        haddress:"",
        load:false,
        addview:false,
        viewH:false,
        dopen:false,
    }
    async componentWillMount() {
        let [dmr,accounts]=await InitialiseWeb3();
        this.DMR=dmr;
        this.account=accounts[0];
        let own = await this.DMR.methods.owner().call();
        await this.setState({owner:own,account:this.account});
        await console.log("owner\t"+this.state.owner);
      }
    
    onAddAddrChange = (event)=>{
        this.setState({addAddr:event.target.value},()=>console.log(this.state.addAddr));
    }
    
    onaddrChange = (event)=>{
        this.setState({addr:event.target.value},()=>console.log(this.state.addr));

    }
    onhnameChange = (event)=>{
        this.setState({hname:event.target.value},()=>console.log(this.state.hname));

    } 
    onhcontactChange = (event)=>{
        this.setState({hcontact:event.target.value},()=>console.log(this.state.hcontact));

    } 
    onhaddressChange = (event)=>{
        this.setState({haddress:event.target.value},()=>console.log(this.state.haddress));

    } 
    onAddSubmit =async (e)=> {
        e.preventDefault();
        await this.setState({load:true});
        try{
            await this.DMR.methods.addAdmin(this.state.addAddr).send({from:this.state.account}).then((res)=>{
                let result = res;
                console.log(result);
                this.setState({load:false});
                alert("Successfully Added Admin");
            });
        }
        catch(e){
            await this.setState({load:false});
            alert("error");
        }

        
    }
    onRemSubmit =async (e)=> {
        e.preventDefault();
        await this.setState({load:true});
        try{
            await this.DMR.methods.removeAdmin(this.state.remAddr).send({from:this.state.account}).then((res)=>{
                let result = res;
                console.log(result);
                this.setState({load:false});
                alert("Successfully Removed Admin");
            });
        }
        catch(e){
            await this.setState({load:false});
            alert("error");
        }

    }
    onOwnSubmit=async (e)=> {
        e.preventDefault();
        await this.setState({load:true});
        try{
            await this.DMR.methods.setOwner(this.state.chgOwner).send({from:this.state.account}).then((res)=>{
                let result = res;
                console.log(result);
                this.setState({load:false});
                alert("Successfully Changed Owner");
            });
        }
        catch(e){
            await this.setState({load:false});
            alert("error");
        }
        await this.setState({load:false});

    }
    onRemAddrChange = (event)=>{
        console.log(this.DMR);
        this.setState({remAddr:event.target.value},()=>console.log(this.state.remAddr));
    }

    onOwnAddrChange = (event)=>{
        this.setState({chgOwner:event.target.value},()=>console.log(this.state.chgOwner));
    }

    isLoading=()=>{
        if(this.state.load){
            return(
            <Box m={2}>
                <Grid container justify="center">
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>
                
            </Box>
            );
        }
        return null;
    }
    addHospital = async ()=>{
        
        await this.setState({addview:false});
        await this.setState({load:true});
        try{
            await this.DMR.methods.addHospital(this.state.hname,this.state.haddress,this.state.hcontact,this.state.addr).send({from:this.state.account}).then((res)=>{
                let result = res;
                console.log(result);
                this.setState({load:false,addview:true});
                alert("Successfully Added Hospital");
            });
        }
        catch(e){
            await this.setState({load:false});
            alert("error");
        }
    }
    getHospital = async ()=>{
        
        await this.setState({viewH:false,addview:false,load:true});
        try{
            await this.DMR.methods.getHospitalByAddress(this.state.addr).call({from:this.state.account}).then((res)=>{
                let result = res;
                console.log(result);
                this.setState({load:false,addview:false,viewH:true,addr:result["addr"],hname:result["hname"],haddress:result["haddress"],hcontact:result["hcontact"],dopen:true});
            });
        }
        catch(e){
            await this.setState({load:false});
            alert("error");
        }
    }
    addHospitalView=()=>{
        if(this.state.addview){
        return(
            <Box>
                <Grid container justify="center">
                    <Grid item>
                        <Paper>

                        <Box p={2}>
                            
                            <Box p={0.3} justifyContent="center" display="flex" alignItems="center">
                                <Typography>Add Hospital</Typography>
                            </Box>
                            <Box m={0.3}>
                                <TextField label="Address" onChange={this.onaddrChange}></TextField>
                            </Box>
                            <Box m={0.3}>
                                <TextField label="Hospital Name" onChange={this.onhnameChange}></TextField>
                            </Box>
                            <Box m={0.3}>
                                <TextField label="Hospital Address" onChange={this.onhaddressChange}></TextField>
                            </Box>
                            <Box m={0.3}>
                                <TextField label="Hospital Contact" onChange={this.onhcontactChange}></TextField>
                            </Box>
                            <Box  m={2} justifyContent="center" display="flex" alignItems="center">
                                <Button color={"primary"} onClick={this.addHospital} variant="contained">Submit</Button>
                            </Box>
                        </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );}
        return null;
    }

    ViewHospital=()=>{
        if(this.state.viewH){
        return(
            <Box>
                <Dialog open={this.state.dopen} onClose={async ()=>{
                    
                }}>
                    <DialogTitle>Hospital Data</DialogTitle>
                    <DialogContent>
                        
                            Name:{"\t"+ this.state.hname}<br></br><br></br>
                            Address:{"\t"+ this.state.haddress}<br></br><br></br>
                            Contact:{"\t"+ this.state.hcontact}<br></br><br></br>
                            Wallet Address:{"\t"+ this.state.addr}<br></br>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={async ()=>{
                            this.setState({dopen:false});
                        }} variant="contained" style={{backgroundColor:"red",color:"white"}}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Grid container justify="center">
                    <Grid item>
                        <Paper>
                            <Box p={2}>
                                <Box m={2} display="flex" alignItems="center" justifyContent="center">
                                    <Typography>
                                        View Hospital Data
                                    </Typography>
                                </Box>
                            <Grid container justify="center" spacing={3}>
                                <Grid item>
                                <TextField onChange={this.onaddrChange} size="small" label="Address" variant="outlined" value={this.state.addr}></TextField> 
                                </Grid>
                                <Grid item>
                                <Button onClick={this.getHospital} color="primary" variant="contained">Search</Button>
                                </Grid>
                            </Grid>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );}
        return null;
    }
    addremoveAdmin=(owner,account)=>{
        return (
            <Box mt={3}>
                <Box m={1}><Card>Contract Owner:{"\t"+owner}</Card></Box>
                <Box m={1}><Card>Current Account:{"\t"+account}</Card></Box>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Paper>
                            <form onSubmit={this.onAddSubmit}>
                            <Box p={3}>
                            <Typography edge="start" variant="h6">Add Admin</Typography>
                            <TextField id="addAddr" label="Enter Address" onChange={this.onAddAddrChange} value={this.state.addAddr}></TextField>
                            <Box m={2}>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Box>
                            </Box>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                        <form onSubmit={this.onRemSubmit}>
                        <Box p={3}>
                            <Typography variant="h6">Remove Admin</Typography>
                            <TextField id="remAddr" label="Enter Address" onChange={this.onRemAddrChange} value={this.state.remAddr}></TextField>
                            <Box m={2}>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Box>
                            </Box>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                        <form onSubmit={this.onOwnSubmit}>
                        <Box p={3}>
                            <Typography variant="h6">Change Owner</Typography>
                            <TextField id="ownAddr" label="Enter Address" onChange={this.onOwnAddrChange} value={this.state.chgOwner}></TextField>
                            <Box m={2}>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Box>
                            </Box>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
                <Box m={1}>
                    <Grid container justify="center" spacing={3}>
                        <Grid item>
                            <Chip label="Add Hospital" style={{backgroundColor:"green"}} onClick={async ()=>{
                                await this.setState({viewH:false,addview:true,load:false});
                            }}></Chip>
                        </Grid>
                        <Grid item>
                            <Chip label="View Hospital" style={{backgroundColor:"red"}} onClick={async ()=>{
                                await this.setState({addview:false,viewH:true,load:false});
                            }}></Chip>
                        </Grid>
                    </Grid>
                </Box>
                
        </Box>);
     
      }
    render(){

        return(
            <>
            <Header></Header>
            {this.addremoveAdmin(this.state.owner,this.state.account)},
            {this.isLoading()},
            {this.addHospitalView()},
            {this.ViewHospital()}
            </>
        );
    }
}



export default Admin;