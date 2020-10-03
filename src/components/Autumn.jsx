import React from 'react'
import {getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Season} from './Season';

const Earlies = ({records, distribution, breedingSites, passageMonths}) => {
	if (distribution.b > 2) return null
	const earlies = findEarlyRecords(records.filter(({location}) => !breedingSites.includes(location)), ...passageMonths);
	return <div>{distribution.b ? 'Earliest non breeding' : 'Earliest'}: {earlies.earliest.location}, {earlies.earliest.date.toDateString()}
<ul>
		{earlies.early.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul>

	</div>
}

// TODO need to clean data to get rid of duplicates which are
// skewing the distribution
const Lates = ({records, distribution, passageMonths}) => {
	if (distribution.w) return null;
	const latest = findLateRecords(records, ...passageMonths)
	return <div>Latest: {latest.latest.location}, {latest.latest.date.toDateString()}
	<ul>
		{latest.late.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul></div>
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

	records = getMonthsOfRecords(records, ...passageMonths)

	return <Season heading="Autumn passage" months={passageMonths} records={records}
			preContent={<Earlies records={records} distribution={distribution} passageMonths={passageMonths} breedingSites={breedingSites} />}
			postContent={<Lates records={records} distribution={distribution} passageMonths={passageMonths}/>}
	/>
}


