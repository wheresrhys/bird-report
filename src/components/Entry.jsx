const React = require('React');

const {getNumberOfSites, getCitywideSiteCounts, getCitywideCounts, getHighSiteCounts} = require('../lib/data-tools')

const CitywideCount = ({records}) => {
	const {highestCount, details} = getCitywideCounts(records);
	return <>{highestCount} ({details.map(({date}, i) => <>{i > 0 ? <>, </> : null}{date.toDateString()}</>)})</>
}

const CitywideSites = ({records}) => {
	const {highestCount, details} = getCitywideSiteCounts(records);
	return <>{highestCount} ({details.map(({date}, i) => <>{i > 0 ? <>, </> : null}{date.toDateString()}</>)})</>
}

const SingleSiteCounts = ({records}) => {
	const counts = getHighSiteCounts(records);

	return <ul>
		{counts.map(({location, date, total}) => <li>{location}, {date.toDateString()}: <b>{total}</b></li>)}
	</ul>
}

const Entry = ({heading, records, includeSites = true}) => records.length ? <li>{heading}:
	<ul>
	<li>Number of sites: {getNumberOfSites(records)}</li>
	<li>Citywide day counts: <CitywideCount records={records} /></li>
	<li>Citywide day max sites: <CitywideSites records={records} /></li>
	{includeSites ? <li>Single site counts: <SingleSiteCounts records={records} /></li> : null}
	</ul>
	</li> : <li>{heading}: No records</li>


module.exports = {Entry}
