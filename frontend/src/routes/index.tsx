import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NewSweepstake from '../pages/NewSweepstake';
import Sweepstake from '../pages/Sweepstake';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/forgot" exact component={ForgotPassword} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/new-sweepstake" component={NewSweepstake} isPrivate />
    <Route path="/sweepstakes" component={Sweepstake} isPrivate />
  </Switch>
);

export default Routes;
