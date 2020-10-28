import React, {useState, useEffect, useContext} from 'react'
import {
  Link,
  useParams,Redirect
} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import {useLocalStorage} from '../lib/useLocalStorage'
import { Species } from '../lib/Context'
import {FirstWinter, SecondWinter} from '../components/Winter'
import {Spring} from '../components/Spring'
import {Trends} from '../components/Trends'
import {Months} from '../components/Months'
import {SettingsForm} from '../components/SettingsForm'
import {Autumn} from '../components/Autumn'
import {getMonthsOfRecords, group, clean} from '../lib/data-tools'

const { ipcRenderer } = window.require('electron')

const Breeding = () => <pre>holding</pre>

const getBreedingSites = records => {
	const breedingMonths = [5, 6]
	records = getMonthsOfRecords(records, ...breedingMonths)

	return group(records, ({location}) => location)
		.map(items => items.length > 2 ? {
			items,
			location: items[0].location
		} : null)
		.filter(items => !!items)
}

const birdsCache = {}

const BirdContent = ({bird}) => {

  const [records, setBirdData] = useState([])
  const [distribution, setDistribution] = useLocalStorage(bird)


  useEffect(() => {
    console.log(records.length)
      const fetchData = async () => ipcRenderer.invoke('get-bird', {bird}).then(data => {
        setBirdData(clean(data))
      })

    //if (!records.length) {
        fetchData();
    //}
  }, [bird]);


  let breedingSites = []
  if (distribution.breeding && distribution.breeding < 3) {
    breedingSites = getBreedingSites(records)
  }

  const birdData = {records, distribution}

  return (
  <>
    <h1>{bird}</h1>
    <Trends {...birdData} />
    <Tabs defaultActiveKey="months" id="uncontrolled-tab-example">
      <Tab eventKey="months" title="Individual months">
        <Months {...birdData} />
        {' '}
      </Tab>
      <Tab eventKey="winter" title="Winter" disabled={!distribution.winter}>
        {distribution.winter ? (
          <>
            <FirstWinter {...birdData} />
            <SecondWinter {...birdData} />
          </>
) : null}
      </Tab>
      <Tab eventKey="spring" title="Spring passage" disabled={!distribution.springPassage}>
        {distribution.springPassage ? <Spring {...birdData} breedingSites={breedingSites} /> : null}
      </Tab>
      <Tab eventKey="breeding" title="Breeding" disabled={!distribution.breeding}>
        {birdData.breeding ? <Breeding {...birdData} /> : null}
      </Tab>
      <Tab eventKey="autumn" title="Autumn passage" disabled={!distribution.autumnPassage}>
        {distribution.autumnPassage ? <Autumn {...birdData} breedingSites={breedingSites} /> : null}
      </Tab>
      <Tab eventKey="settings" title="Settings" >
        <SettingsForm species={bird} distribution={distribution} setDistribution={setDistribution}/>
      </Tab>
    </Tabs>
  </>
  )
}

export const BirdPage = () => {
  const { bird } = useParams();
  return <BirdContent bird={bird} />
}

