import React from 'react'
import {getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Entry} from './Entry'

const Earlies = ({records, distribution, breedingSites, passageMonths}) => {
	if (distribution.b > 2) return null
	const earlies = findEarlyRecords(records.filter(({location}) => !breedingSites.includes(location)), ...passageMonths);
	return <li>{distribution.b ? 'Earliest non breeding' : 'Earliest'}: {earlies.earliest.location}, {earlies.earliest.date.toDateString()}
<ul>
		{earlies.early.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul>

	</li>
}

// TODO need to clean data to get rid of duplicates which are
// skewing the distribution
const Lates = ({records, distribution, passageMonths}) => {
	if (distribution.w) return null;
	const latest = findLateRecords(records, ...passageMonths)
	return <li>Latest: {latest.latest.location}, {latest.latest.date.toDateString()}
	<ul>
		{latest.late.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul></li>
}

export const Autumn = ({records, distribution, breedingSites}) => {
	breedingSites = breedingSites.map(({location}) => location)
	const passageMonths = [7, 8, 9, 10];
	if (distribution.b < 3) {
		passageMonths.unshift(6)
	}
	if (!distribution.w < 2) {
		passageMonths.push(11, 12)
	}




	// TODO - show multiple records for early and late


		// ...((b > 2 || w > 2) ? {} : {totalThrough: sum(records, ...passageMonths)}),


	return <section>
		<h1>Autumn passage</h1>
		<ul>
			<Earlies records={records} distribution={distribution} passageMonths={passageMonths} breedingSites={breedingSites}  />
			{!distribution.b ? <Entry heading="June" records={getMonthsOfRecords(records, 6)} /> : null}
			<Entry heading="July" records={getMonthsOfRecords(records, 7)} />
			<Entry heading="August" records={getMonthsOfRecords(records, 8)} />
			<Entry heading="September" records={getMonthsOfRecords(records, 9)} />
			<Entry heading="October" records={getMonthsOfRecords(records, 10)} />
			{!distribution.w ? <Entry heading="November" records={getMonthsOfRecords(records, 11)} /> : null}
			{!distribution.w ? <Entry heading="December" records={getMonthsOfRecords(records, 12)} /> : null}
			<Entry heading="Whole period" records={getMonthsOfRecords(records, ...passageMonths)} includeSites={false} />
			<Lates records={records} distribution={distribution} passageMonths={passageMonths}/>
		</ul>

	</section>
}


