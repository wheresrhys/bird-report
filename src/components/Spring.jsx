import React from 'react'
import {getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Entry} from './Entry'

const Earlies = ({records, distribution, passageMonths}) => {
	if (distribution.w) return null;
	const earlies = findEarlyRecords(records, ...passageMonths);
	return <li>Earliest: {earlies.earliest.location}, {earlies.earliest.date.toDateString()}
	<ul>
		{earlies.early.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul></li>
}

const Lates = ({records, distribution, breedingSites, passageMonths}) => {
	if (distribution.b > 2) return null
	const latest = findLateRecords(records.filter(({location}) => !breedingSites.includes(location)), ...passageMonths)
	return <li>{distribution.b ? 'Latest non breeding' : 'Latest'}: {latest.latest.location}, {latest.latest.date.toDateString()}
	<ul>
		{latest.late.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul></li>
}

export const Spring = ({records, distribution, breedingSites}) => {
	breedingSites = breedingSites.map(({location}) => location)
	const passageMonths = [ 4, 5];
	if (!distribution.b) {
		passageMonths.push(6)
	}
	if (!distribution.w) {
		passageMonths.unshift(2, 3)
	}
	// // peaknumbers
	// // total sites
	// 	...((b > 2 || w > 2) ? {} : {totalThrough: sum(records, ...passageMonths)}),
	// }
	// TODO - show multiple records for early and late

	// if resident assume short distance migrant
	// else assume long distance migrant
	// If it's not a widespread breeder then we assume winter stretches
	// into March



	return <section>
		<h1>Spring passage</h1>
		<ul>
			<Earlies records={records} distribution={distribution} passageMonths={passageMonths}/>
			{!distribution.w ? <Entry heading="February" records={getMonthsOfRecords(records, 2)} /> : null}
			{!distribution.w ? <Entry heading="March" records={getMonthsOfRecords(records, 3)} /> : null}
			<Entry heading="April" records={getMonthsOfRecords(records, 4)} />
			<Entry heading="May" records={getMonthsOfRecords(records, 5)} />
			{!distribution.b ? <Entry heading="June" records={getMonthsOfRecords(records, 6)} /> : null}
			<Entry heading="Whole period" records={getMonthsOfRecords(records, ...passageMonths)} includeSites={false} />
			<Lates records={records} distribution={distribution} breedingSites={breedingSites} passageMonths={passageMonths}/>
		</ul>

	</section>
}
