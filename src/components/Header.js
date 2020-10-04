import React,{Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography } from "@material-ui/core";

class Header extends Component {
    render(){
        return(
<AppBar position="static">
<Toolbar>
    <Typography variant="h5">
      Decentralized Medical Records
    </Typography>
</Toolbar>
</AppBar>
        );
    }
}

export default Header;