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
      <Main/>
      <Sidebar/>
        </div>
    </div>
          <Switch>
              <Route path="/">
                  <Main />
              </Route>
              <Route path="/kategorijos">
                  <Category />
              </Route>
              <Route path="/skelbimai">
                  <Ads />
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
