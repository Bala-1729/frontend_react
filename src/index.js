import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter  as Router, Switch, Route } from "react-router-dom";
import login from "./views/login/App";
import home from "./views/landingPage/App";
import dashboard from "./views/dashboard/App"
import reg_dev from "./views/register_device/App";
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory as history } from 'history';

ReactDOM.render(
  <Router history={history}>
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/home" component={home}/>
        <Route path="/dashboard" component={dashboard}/>
        <Route path="/register_device" component={reg_dev}/>
        <Route path="/" component={login}/>
      </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
