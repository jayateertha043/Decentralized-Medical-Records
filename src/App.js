import React, { Component } from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom';
import Home from "./routes/home";
import Admin from "./routes/admin";
import Hospital from "./routes/hospital";
import Patient from "./routes/patient";
import Signup from "./routes/signup";
import Embed from "./routes/embed";
class App extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/"exact>
            <Home/>
          </Route>
          <Route path="/admin" exact>
            <Admin/>
          </Route>
          <Route path="/signup" exact>
            <Signup/>
          </Route>    
          <Route path="/patient" exact>
            <Patient/>
          </Route>
          <Route path="/hospital" exact>
            <Hospital/>
          </Route>
          <Route path="/embed/:id" exact render={(props) => <Embed {...props}/>}>

          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;