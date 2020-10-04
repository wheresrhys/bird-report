import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import { BirdPage } from './pages/BirdPage'
import birds from './config/birds'
import { Navbar } from 'react-bootstrap'

const App = () => (
  <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Bird report tool</Navbar.Brand>
    </Navbar>
    <div className="container">
      <nav className="nav">
        {Object.keys(birds).map((bird) => (
          <a className="nav-link active" href={`/bird/${bird}`}>
            {bird}
          </a>
        ))}
      </nav>
      <Router>
        <Switch>
          <Route path="/bird/:bird">
            <BirdPage />
          </Route>
        </Switch>
      </Router>
    </div>
  </>
)

export default App
