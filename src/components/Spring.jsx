import React from 'react'
import {getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Season} from './Season';

const Earlies = ({records, distribution, passageMonths}) => {
	if (distribution.w) return null;
	const earlies = findEarlyRecords(records, ...passageMonths);
	return <div>Earliest: {earlies.earliest.location}, {earlies.earliest.date.toDateString()}
	<ul>
		{earlies.early.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul></div>
}

const Lates = ({records, distribution, breedingSites, passageMonths}) => {
	if (distribution.b > 2) return null
	const latest = findLateRecords(records.filter(({location}) => !breedingSites.includes(location)), ...passageMonths)
	return <div>{distribution.b ? 'Latest non breeding' : 'Latest'}: {latest.latest.location}, {latest.latest.date.toDateString()}
	<ul>
		{latest.late.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul></div>
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
	records = getMonthsOfRecords(records, ...passageMonths)

	return <Season heading="Spring passage" months={passageMonths} records={records}
		preContent={<Earlies records={records} distribution={distribution} passageMonths={passageMonths}/>}
		postContent={<Lates records={records} distribution={distribution} breedingSites={breedingSites} passageMonths={passageMonths}/>}
	/>

}

