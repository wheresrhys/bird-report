import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import {HomePage} from './pages/HomePage';

const Page = () => {
    let { bird } = useParams();
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">home</Link>
      </header>
    </div>
  );
}

const App = () => <Router>
    <Switch>
      <Route path="/bird/:bird">
        <Page />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
</Router>



export default App;
