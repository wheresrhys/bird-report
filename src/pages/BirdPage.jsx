import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {FirstWinter} from '../components/FirstWinter';
import {Spring} from '../components/Spring';
import {Autumn} from '../components/Autumn';
import {SecondWinter} from '../components/SecondWinter';
import {getMonthsOfRecords, group} from '../lib/data-tools';
import birds from '../config/birds';

const { ipcRenderer } = window.require("electron")

const Breeding = () => <pre>holding</pre>

const getBreedingSites = records => {
	const breedingMonths = [5, 6];
	records = getMonthsOfRecords(records, ...breedingMonths);

	return group(records, ({location}) => location)
		.map(items => items.length > 2 ? {
			items,
			location: items[0].location
		} : null)
		.filter(items => !!items)
}

export const BirdPage = () => {

  let { bird } = useParams();
  const [birdData, setBirdData] = useState({distribution : {}});
  ipcRenderer.invoke('get-bird', {bird}).then(data => {
  	setBirdData({
  		records: data,
  		distribution: birds[bird]
  	})
  });

	let breedingSites = []
	if (birdData.distribution.b && birdData.distribution.b < 3) {
		breedingSites = getBreedingSites(birdData.records)
	}
	return <>
	<h1>{bird}</h1><Link to="/">home</Link>
	{birdData.distribution.w ? <FirstWinter {...birdData} /> : null}
	{birdData.distribution.s ? <Spring {...birdData} breedingSites={breedingSites}/> : null}
	{birdData.breeding ? <Breeding {...birdData} /> : null}
	{birdData.distribution.a ? <Autumn {...birdData} breedingSites={breedingSites}/> : null}
	{birdData.distribution.w ? <SecondWinter {...birdData} /> : null}
</>}

