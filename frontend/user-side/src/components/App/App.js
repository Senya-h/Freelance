import React from 'react';
import Navbar from '../Navbar/Navbar';
import FreelancerProfile from '../Profile/FreelancerProfile/FreelancerProfile';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Main from '../../containers/Main/Main';
import PageNotFound from '../../containers/PageNotFound/PageNotFound';

function App() {
  
  return (
    <div className="App">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/profile' component={FreelancerProfile} />
          <Route component={PageNotFound} />
        </Switch>
    </div>
  );
}

export default App;
