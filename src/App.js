import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import { BirdPage } from './pages/BirdPage'
import { ConfigPage } from './pages/ConfigPage'
import birds from './config/birds'
import { Navbar } from 'react-bootstrap'
import { Species } from "./lib/Context.js";
const { ipcRenderer } = window.require('electron')





const App = () => {

  const [speciesList, setSpeciesList] = useState([]);
  const [species, setSpecies] = useState({});
  const fetchSpeciesList = () => ipcRenderer.invoke('get-species-list').then(data => {
    setSpeciesList(data)
    setSpecies(Object.fromEntries(data.map(name => ([name, {}]))))
  })

  useEffect(() => {
    fetchSpeciesList()
  }, [])

  return <Species.Provider value={[species, setSpecies]}>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Bird report tool</Navbar.Brand>
    </Navbar>
    <div className="container">
      <nav className="nav">
        {speciesList.map((bird) => (
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
          <Route path="/">
            <ConfigPage />
          </Route>
        </Switch>
      </Router>
    </div>
  </Species.Provider>
}

export default App
