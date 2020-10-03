import React from 'react';
import {getNumberOfSites, getCitywideSiteCounts, getCitywideCounts, getHighSiteCounts} from '../lib/data-tools';


const CitywideCount = ({records}) => {
	const {highestCount, details} = getCitywideCounts(records);
	return <>{highestCount} ({details.map(({date}, i) => <>{i > 0 ? (<>, </>) : null}{date.toDateString()}</>)})</>
}

const CitywideSites = ({records}) => {
	const {highestCount, details} = getCitywideSiteCounts(records);
	return <>{highestCount} ({details.map(({date}, i) => <>{i > 0 ? <>, </> : null}{date.toDateString()}</>)})</>
}

const SingleSiteCounts = ({records}) => {
	const counts = getHighSiteCounts(records);

	return <ul>
		{counts.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul>
}

export const Entry = ({heading, records, includeSites = true}) => records.length ? <div>{heading}:
	<ul>
	<li>Number of sites: {getNumberOfSites(records)}</li>
	<li>Max citywide day count: <CitywideCount records={records} /></li>
	<li>Max citywide sites in a day: <CitywideSites records={records} /></li>
	{includeSites ? <li>Single site counts: <SingleSiteCounts records={records} /></li> : null}
	</ul>
	</div> : <div>{heading}: No records</div>

export const Month = props =>
	<li style={{display: 'none'}}><Entry {...props} /></li>



