import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (isLogin() && restricted ? 
    <Redirect to="/home" /> : <Component {...props} />)} />
) */

const PublicRoute = ()=><div>public route</div>;

export default PublicRoute;