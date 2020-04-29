import React, {useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import FreelancerProfile from './containers/Profile/FreelancerProfile/FreelancerProfile';
import ClientProfile from './containers/Profile/ClientProfile/ClientProfile';
import Profile from './containers/Profile/Profile';

import {Switch, Route} from 'react-router-dom';
import Main from './containers/Main';
import PageNotFound from './containers/PageNotFound';
import Register from  './containers/Register';
import Login from './containers/Login';
import RemindPassword from './containers/RemindPassword/RemindPassword';
import ForgotChangePassword from './containers/RemindPassword/ForgotChangePassword';
import Freelancers from './containers/Freelancers';
import Messages from './containers/Messages';
import Footer from './components/Footer';
import NewOffer from './containers/NewOffer';
import Jobs from './containers/Jobs';
import MyJobs from './containers/MyJobs';

import ScrollToTop from './components/ScrollToTop';
import ScrollToTopIcon from './components/ScrollToTopIcon';
import HeroWrap from './hoc/HeroWrap';
import {AuthContext} from './context/auth';

import Cookies from 'js-cookie';
import axios from './axios';

const App = () => {  
  const authCookie = Cookies.get('access_token');

  const existingTokens = authCookie? JSON.parse(authCookie): undefined;
  const [authData, setAuthData] = useState(existingTokens);

  if(authData) {
    axios.get('/checkJWT', {
      headers: {
        'Authorization': 'Bearer ' + authData.token
      }
    })
      .then(res => {
        if(res.data.banned) {
          removeTokens();
        }
      })
  }


  const setTokens = (data) => {
    Cookies.set('access_token', data);
    setAuthData(data);
  }

  const removeTokens = () => {
    Cookies.remove('access_token');
    setAuthData(undefined);
  }


  return (
    <AuthContext.Provider value={{authData, setAuthData: setTokens, removeAuthData: removeTokens}}>
      <Navbar />
      <HeroWrap>
        <ScrollToTop>
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/password-reminder' component={RemindPassword} />
            <Route path='/password/reset/' component={ForgotChangePassword} />

            <Route path='/profile' exact component={Profile} />
            <Route path='/freelancer/:id' component={FreelancerProfile} />
            <Route path='/client/:id' component={ClientProfile} />

            <Route path='/jobs' component={Jobs} />
            <Route path='/freelancers' component={Freelancers} />
            <Route path='/messages' component={Messages} />
            <Route path='/new-offer' component={NewOffer} />
            <Route path='/my-jobs' component={MyJobs} />
            <Route component={PageNotFound} />
          </Switch>
        </ScrollToTop>
        <Footer />
      </HeroWrap>
      <ScrollToTopIcon />
    </AuthContext.Provider>
  );
}

export default App;


