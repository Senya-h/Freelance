import React from 'react';
import './App.css';
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import Category from "../Category/Category";
import Ads from "../Ads/Ads";
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
                <Route path="/kategorijos" exact component={Category}/>
                <Route path="/skelbimai" exact component={Ads}/>
            </Switch>
        </div>
    </div>
      </Router>

  );
}

export default App;
