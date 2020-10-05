import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import { BirdPage } from './pages/BirdPage'
import { ConfigPage } from './pages/ConfigPage'
import birds from './config/birds'
import { Navbar } from 'react-bootstrap'
import { Species } from './lib/Context.js'

const { ipcRenderer } = window.require('electron')

const App = () => {

  const [speciesList, setSpeciesList] = useState([])
  const [species, setSpecies] = useState({})
  const fetchSpeciesList = () => ipcRenderer.invoke('get-species-list').then(data => {
    setSpeciesList(data)
    setSpecies(Object.fromEntries(data.map(name => ([name, {}]))))
  })
  if (!Object.keys(species).length) {
    fetchSpeciesList()
  }

  return (
    <Species.Provider value={[species, setSpecies]}>
      <Router>
        {' '}
        <Navbar bg="light" expand="lg">
          <Link to="/">Bird report tool</Link>
        </Navbar>
        <div className="container">
          <nav className="nav">
            {speciesList.map((bird) => (
              <Link className="nav-link active" to={`/bird/${bird}`}>
                {bird}
              </Link>
            ))}
          </nav>

          <Switch>
            <Route path="/bird/:bird">
              <BirdPage />
            </Route>
            <Route path="/">
              <ConfigPage />
            </Route>
          </Switch>

        </div>
      </Router>
    </Species.Provider>
)
}

export default App
