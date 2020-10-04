import React, {useState} from 'react'
import {
  Link,
  useParams
} from 'react-router-dom'
import {FirstWinter, SecondWinter} from '../components/Winter'
import {Spring} from '../components/Spring'
import {Autumn} from '../components/Autumn'
import {getMonthsOfRecords, group, clean} from '../lib/data-tools'
import birds from '../config/birds'

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

export const BirdPage = () => {

  const { bird } = useParams()
  const [birdData, setBirdData] = useState({distribution : {}})
  ipcRenderer.invoke('get-bird', {bird}).then(data => {
  	setBirdData({
  		records: clean(data),
  		distribution: birds[bird]
  	})
  })

	let breedingSites = []
	if (birdData.distribution.b && birdData.distribution.b < 3) {
		breedingSites = getBreedingSites(birdData.records)
	}
	return (
  <>
    <h1>{bird}</h1>
    {birdData.distribution.w ? <FirstWinter {...birdData} /> : null}
    {birdData.distribution.s ? <Spring {...birdData} breedingSites={breedingSites} /> : null}
    {birdData.breeding ? <Breeding {...birdData} /> : null}
    {birdData.distribution.a ? <Autumn {...birdData} breedingSites={breedingSites} /> : null}
    {birdData.distribution.w ? <SecondWinter {...birdData} /> : null}
  </>
)}

