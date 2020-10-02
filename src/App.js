import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import {HomePage} from './pages/HomePage';
import {BirdPage} from './pages/BirdPage';

const App = () => <Router>
    <Switch>
      <Route path="/bird/:bird">
        <BirdPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
</Router>



export default App;
