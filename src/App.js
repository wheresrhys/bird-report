import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import {BirdPage} from './pages/BirdPage';
import birds from './config/birds'

const App = () => <>
<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Bird report tool</a>
</nav>
<div className="container">
<nav class="nav">
{Object.keys(birds).map(bird => <a class="nav-link active" href={`/bird/${bird}`}>{bird}</a>)}
</nav>
<Router>
    <Switch>
      <Route path="/bird/:bird">
        <BirdPage />
      </Route>
      <Route path="/">
      </Route>
    </Switch>
</Router>
</div></>


export default App;
