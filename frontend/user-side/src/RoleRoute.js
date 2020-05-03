import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const {authData} = useAuth();

  return(
    <Route {...rest} render={(props) => authData && authData.userRole === role?
      <Component {...props} />
      : 
      <Redirect to={{ pathname: '/'}} /> 
    }
    />
  );
}

export default PrivateRoute;