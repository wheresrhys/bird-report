<svelte:head>
	<title>London Bidr Report</title>
</svelte:head>

<script>
  import {Form, FormGroup, Input} from 'sveltestrap';
  import {importData}  from '../lib/data-loader'

  /**
   * @param {CustomEvent} ev
   */
  const handleFileLoad = (ev) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
       const result = importData( new Uint8Array(reader.result))
       console.log(result)
       // setBirdData({
       //   speciesList: getSpeciesList(records),
       //   records
       // })
      });
      reader.readAsArrayBuffer(ev.currentTarget.files[0]);
  }

</script>
        <Form><FormGroup>
          <Input type="file"
            id="custom-file"
            label="Load spreadsheet"
            on:change={handleFileLoad}
          /></FormGroup>
        </Form>
<!--

  import React, {useState} from 'react'
  import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
  import logo from './logo.svg'
  import './App.css'

  import { BirdPage } from './pages/BirdPage'
  import { Navbar, Form } from 'react-bootstrap'
  import { BirdData } from './lib/Context'
  import XLSX from 'xlsx';

const loadRecords = (buffer) => {
  const rawData = XLSX.read(buffer, {cellDates: true, type: 'array'});
  const data = XLSX.utils.sheet_to_json(rawData.Sheets[rawData.SheetNames[0]]);

  return data.map(row => ({
    species: row.SPECIES,
    location: row.Location,
    date: row['Date:D'],
    number: row.Number,
    numberIndex: row.NumberIndex,
    notes: row.Notes,
    recordingArea: row.RecordingArea,
    viceCounty: row.ViceCounty || row.Sector,
    observer: row.Observer,
    source: row.Source
  }));
}

const getSpeciesList = records => [...records.reduce((set, {species}) => set.add(species), new Set())]

const App = () => {

  const [birdData, setBirdData] = useState({speciesList: [], records: []})

  const onFileChange = (ev) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
       const records = loadRecords( new Uint8Array(reader.result))
       setBirdData({
         speciesList: getSpeciesList(records),
         records
       })
      });
      reader.readAsArrayBuffer(ev.currentTarget.files[0]);
  }


  return (
    <BirdData.Provider value={[birdData, setBirdData]}>
      <Router>
        {' '}
        <Navbar bg="light" expand="lg">
          <Link to="/">Bird report tool</Link>
        </Navbar>

        <div className="container">
          <nav className="nav">
            {birdData.speciesList.map((bird) => (
              <Link className="nav-link active" to={`/bird-report/${bird}`}>
                {bird}
              </Link>
            ))}
          </nav>

          <Switch>
            <Route path="/bird-report/:bird">
              <BirdPage />
            </Route>
            <Route path="/">
            </Route>
          </Switch>

        </div>
      </Router>
    </BirdData.Provider>
)
}

export default App
 -->
