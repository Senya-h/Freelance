import React, {useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import FreelancerProfile from './components/Profile/FreelancerProfile/FreelancerProfile';

import {Switch, Route} from 'react-router-dom';
import Main from './containers/Main/Main';
import PageNotFound from './containers/PageNotFound/PageNotFound';
import Register from  './containers/Register/Register';
import Login from './containers/Login/Login';
import PrivateRoute from './PrivateRoute';
import {AuthContext} from './context/auth';

import Cookies from 'js-cookie';

import {CssBaseline} from '@material-ui/core';

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
      {/*Used for standardizing default styles between browsers */}
      <CssBaseline /> 
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens, removeAuthTokens: removeTokens}}>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Login} />
            <PrivateRoute path='/profile' component={FreelancerProfile} />

            <Route component={PageNotFound} />
          </Switch>
        </AuthContext.Provider>
    </div>
  );
}

export default App;


