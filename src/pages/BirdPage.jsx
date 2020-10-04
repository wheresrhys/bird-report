import React, {useState, useEffect} from 'react'
import {
  Link,
  useParams
} from 'react-router-dom'
import {FirstWinter, SecondWinter} from '../components/Winter'
import {Spring} from '../components/Spring'
import {Autumn} from '../components/Autumn'
import {getMonthsOfRecords, group, clean} from '../lib/data-tools'
import birds from '../config/birds'
import {Tabs, Tab} from 'react-bootstrap'
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

export const BirdPage = () => {
  const { bird } = useParams()
  const [birdData, setBirdData] = useState(birdsCache[bird] || {distribution : {}})
  const fetchData = () => ipcRenderer.invoke('get-bird', {bird}).then(data => {
  	birdsCache[bird] = {
  		records: clean(data),
  		distribution: birds[bird]
  	}
  	setBirdData(birdsCache[bird])
  })

  useEffect(() => {
  	fetchData()
  }, [])

	let breedingSites = []
	if (birdData.distribution.b && birdData.distribution.b < 3) {
		breedingSites = getBreedingSites(birdData.records)
	}
	return (<>
		<h1>{bird}</h1>
<Tabs defaultActiveKey="winter" id="uncontrolled-tab-example">
  <Tab eventKey="winter" title="Winter" disabled={!birdData.distribution.w}>
    {birdData.distribution.w ? <><FirstWinter {...birdData} /><SecondWinter {...birdData} /></> : null}
  </Tab>
  <Tab eventKey="spring" title="Spring passage" disabled={!birdData.distribution.s}>
    {birdData.distribution.s ? <Spring {...birdData} breedingSites={breedingSites} /> : null}
  </Tab>
  <Tab eventKey="breeding" title="Breeding" disabled={!birdData.distribution.b}>
    {birdData.breeding ? <Breeding {...birdData} /> : null}
  </Tab>
  <Tab eventKey="autumn" title="Autumn passage" disabled={!birdData.distribution.a}>
    {birdData.distribution.a ? <Autumn {...birdData} breedingSites={breedingSites} /> : null}
  </Tab>
</Tabs></>
)}

