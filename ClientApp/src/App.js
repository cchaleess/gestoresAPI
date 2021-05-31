import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { Navigation } from './components/Navigation';


export default class App extends Component {
    
  render () {
      return (
          <BrowserRouter>
              <div className="container">                 
                  <h3 className="m-3 d-flex justify-content-center">
                      API NETCORE - SQL SERVER - REACTJS
                  </h3>                 
                  <Navigation />
                  <Switch>
                      <Route path="/" component={Home} exact />
                      <Route path="/department" component={Department} exact />
                      <Route path="/employee" component={Employee} exact />
                   </Switch>
              </div>
          </BrowserRouter>
    );
  }
}
