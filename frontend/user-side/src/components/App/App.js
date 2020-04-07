import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import FreelancerProfile from '../Profile/FreelancerProfile/FreelancerProfile';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Main from '../../containers/Main/Main';
import PageNotFound from '../../containers/PageNotFound/PageNotFound';
import Register from  '../../containers/Register/Register';
import Login from '../../containers/Login/Login';
import PrivateRoute from '../../PrivateRoute';
import {AuthContext} from '../../context/auth';

import Cookies from 'js-cookie';

const App = () => {  
  const existingTokens = Cookies.get('access_token');
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    Cookies.set('access_token', data);
    setAuthTokens(data);
  }

  const removeTokens = () => {
    Cookies.remove('access_token');
    setAuthTokens(undefined);
  }

  return (
    <div className="App">
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens, removeAuthTokens: removeTokens}}>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Main} />
            <PrivateRoute path='/profile' component={FreelancerProfile} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </AuthContext.Provider>
    </div>
  );
}

export default App;


