import React from 'react';
import {Season} from './Season';
import {getMonthsOfRecords} from '../lib/data-tools'

export const FirstWinter = ({records, distribution}) => {

	// If it's not a widespread breeder then we assume winter stretches
	// into March
	const notWidespreadBreeder = distribution.b < 3;
	const months = notWidespreadBreeder < 3 ? [1, 2, 3] : [1, 2]
	records = getMonthsOfRecords(records, ...months)
	return <Season heading="First winter" months={months} records={records} />
}

export const SecondWinter = ({records, distribution}) => {
	records = getMonthsOfRecords(records, 11, 12)
	return <Season heading="Second winter" months={[11, 12]} records={records} />
}

