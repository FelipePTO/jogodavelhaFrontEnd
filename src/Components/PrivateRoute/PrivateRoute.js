import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAllowed } from '../../Services/Auth';

export const PrivateRoute = ({permissao:permissao, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>{
      return isAllowed(permissao) ? (
        <Component {...props} />
      ) : ( 
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )}
    }
  />
);
