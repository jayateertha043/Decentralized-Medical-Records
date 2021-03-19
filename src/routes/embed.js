import React, { Component } from 'react'
import {Card,Grid,Box,Paper, Typography,TextField, Button,CircularProgress,MenuItem} from '@material-ui/core';
import Header from "../components/Header";
import InitialiseWeb3 from '../components/web3';
var CryptoJS = require("crypto-js");
var decryptedtext;
function encode(myString){
    const encodedWord = CryptoJS.enc.Utf8.parse(myString); // encodedWord Array object
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
}
  function decode(encoded){
    const encodedWord = CryptoJS.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
    const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
    return decoded;
}
class Embed extends Component {
    constructor(props) {
        super(props);
    }

    DMR=null;account="";
    state={
        owner: "loading",
        account:"loading",
        show:false,
        load:true
    }

    async componentWillMount() {
        let [dmr,accounts]=await InitialiseWeb3();
        this.DMR=dmr;
        this.account=accounts[0];
        let own = await this.DMR.methods.owner().call();
        await this.setState({owner:own,account:this.account});
        console.log("owner\t"+this.state.owner);
        console.log("Account\t"+this.state.account);
        var referer = document.referrer;
        var domain = window.location.protocol + "//" + window.location.host+"/";
        console.log("referer:"+referer);
        console.log("url:"+domain);
        console.log(this.props.match.params.id);
        decryptedtext = CryptoJS.AES.decrypt(decode(this.props.match.params.id).toString(), 'dmr').toString(CryptoJS.enc.Utf8);
        decryptedtext = decryptedtext.slice(1,-1)
        console.log(decryptedtext);
        decryptedtext = "https://view.officeapps.live.com/op/embed.aspx?src=" + decryptedtext;
        console.log(decryptedtext);
        if(referer.includes(domain)){
            await this.setState({show:true,load:false});
        }
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

    render(){

        return(
            <>
            <Header></Header>

            {
            this.state.show?
            [
            <React.Fragment>
            <embed src={decryptedtext} width="100%" height="500px"></embed>
            <this.isLoad></this.isLoad>
            </React.Fragment>]
            :null
            }
            </>
        );
    }
}

export default Embed;