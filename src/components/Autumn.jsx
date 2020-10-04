import React from 'react'
import {getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Season} from './Season'
import { Record} from './Records'
const getEarlies = ({records, distribution, breedingSites, passageMonths}) => {
	if (distribution.b > 2) return null
	const earlies = findEarlyRecords(records.filter(({location}) => !breedingSites.includes(location)), ...passageMonths)
	return {
		heading: distribution.b ? 'Earliest non breeding' : 'Earliest',


  content: <Record {...earlies} />

}
}

const getLates = ({records, distribution, passageMonths}) => {
	if (distribution.w) return null
	const latest = findLateRecords(records, ...passageMonths)
	return {heading: 'Latest',
  content: <Record {...latest} />
}
}

export const Autumn = ({records, distribution, breedingSites}) => {
	breedingSites = breedingSites.map(({location}) => location)
	const passageMonths = [7, 8, 9, 10]
	if (distribution.b < 3) {
		passageMonths.unshift(6)
	}
	if (!distribution.w < 2) {
		passageMonths.push(11, 12)
	}

	// TODO - show multiple records for early and late


		// ...((b > 2 || w > 2) ? {} : {totalThrough: sum(records, ...passageMonths)}),

	records = getMonthsOfRecords(records, ...passageMonths)

	return (
  <Season
    heading="Autumn passage"
    months={passageMonths}
    records={records}
    preContent={
    	[getEarlies({
    		records,
    		distribution,
    		passageMonths,
    		breedingSites
    	})]
    }
    postContent={
			[getLates({
    		records,
    		distribution,
    		passageMonths,

    	})]
}
  />
)
}


