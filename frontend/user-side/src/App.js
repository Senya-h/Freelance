import React, {useState, useEffect} from 'react';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

import Navbar from './components/Navbar/Navbar';
import FreelancerProfile from './containers/Profile/FreelancerProfile';
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
import EditOffer from './containers/EditOffer';
import Jobs from './containers/Jobs';
import Job from './containers/Job';
import MyJobs from './containers/MyJobs';
import Message from './containers/Message';

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
  console.log("Auth data: ", authData);
  
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
      .catch(err => {
          removeTokens();
      })
  }

  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    if(authData) {
        axios.get('/message/count/' + authData.userID)
        .then(res => {
            setMessagesCount(res.data);
        })
    }
  }, [authData])


  const setTokens = (data) => {
    Cookies.set('access_token', data);
    setAuthData(data);
  }

  const removeTokens = () => {
    Cookies.remove('access_token');
    setAuthData(undefined);
  }


  return (
    <AuthContext.Provider value={{authData, setAuthData: setTokens, removeAuthData: removeTokens, messagesCount, setMessagesCount}}>
        <Navbar messagesCount={messagesCount} setMessagesCount={setMessagesCount} />
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
              <Route path='/job/:id' component={Job} />
              <Route path='/freelancers' component={Freelancers} />
              <PrivateRoute path='/messages' exact render={(props) => <Messages {...props} setMessagesCount={setMessagesCount} />}  />
              <PrivateRoute path="/messages/:id" exact component={Message} />
              <RoleRoute role={2} path='/new-offer' component={NewOffer} />
              <RoleRoute role={2} path="/edit/job/:id" component={EditOffer} />
              <RoleRoute role={2} path='/my-jobs' component={MyJobs} />
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


