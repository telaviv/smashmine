import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import * as containers from './containers';


const {
  NotFoundPage,
  ComparePage,
} = containers;


export default (
  <Route component={App}>
    <Route path="/compare" component={ComparePage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
