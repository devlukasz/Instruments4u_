import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Details from './Details';

function RoutePage(props) {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/details/:objectID" component={Details} />
      <Route component={App} />
    </Switch>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <RoutePage />
  </BrowserRouter>,
  document.getElementById('root')
);
