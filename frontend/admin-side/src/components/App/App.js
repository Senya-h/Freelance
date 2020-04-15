import React from 'react';
import './App.css';
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import Skills from "../Skills/Skills";
import Services from "../Services/Services";
import Portfolio from "../Portfolio/Portfolio";
import Users from "../Users/Users";
import{
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from "react-router-dom";

function App() {
  return (
      <Router>
    <div className="App">
        <div id="wrapper">
      <Sidebar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/igudziai" exact component={Skills}/>
                <Route path="/paslaugos" exact component={Services}/>
                <Route path="/portfolio" exact component={Portfolio}/>
                <Route path="/vartotojai" exact component={Users}/>
            </Switch>
        </div>
    </div>
      </Router>

  );
}

export default App;
