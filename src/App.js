import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoutes } from './routes/privateRoutes.js';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import PAGENOTFOUND from './pages/pageNotFound.js';
import './App.css';

class App extends React.Component{
  render(){
  return (
    <BrowserRouter>
    <Switch>
    <PrivateRoutes exact path="/Login" component={Login} />
    <PrivateRoutes exact path="/Search" component={Dashboard} />
    <Route exact path="/" component={Login} />
    <Route path="*" component={PAGENOTFOUND} />
    </Switch>
    </BrowserRouter>
  );
}
}

export default App;
