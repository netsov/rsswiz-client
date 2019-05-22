import React from 'react';

import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import asyncComponent from '../components/AsyncComponent';
import { decodeUser } from './utils';

// eslint-disable-next-line react/display-name
const RedirectRoute = (condition, redirectTo) => ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      condition() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location }
          }}
        />
      )}
  />
);

const PrivateRoute = RedirectRoute(() => decodeUser(), '/');
const LandingRoute = RedirectRoute(() => !decodeUser(), '/feeds');

const Root = () => (
  <Router>
    <Switch>
      <LandingRoute
        exact
        path="/"
        component={asyncComponent(() => import('../routes/Landing'))}
      />
      <PrivateRoute
        exact
        path="/feeds"
        component={asyncComponent(() => import('../routes/Feeds'))}
      />
      <PrivateRoute
        exact
        path="/feeds/:id"
        component={asyncComponent(() => import('../routes/Feed'))}
      />
      <PrivateRoute
        exact
        path="/settings"
        component={asyncComponent(() => import('../routes/Settings'))}
      />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default Root;
