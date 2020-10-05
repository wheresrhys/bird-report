import React from 'react'
import {throughput, getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Season} from './Season'
import { Record} from './Records'

const getEarlies = ({records, distribution, breedingSites}) => {
	if (distribution.breeding > 2) return null
	const earlies = findEarlyRecords(records.filter(({location}) => !breedingSites.includes(location)))
	return {
		heading: distribution.breeding ? 'Earliest non breeding' : 'Earliest',


  content: <Record {...earlies} viewMoreHeading="View other early records" />

}
}

const getLates = ({records, distribution}) => {
	if (distribution.winter) return null
	const latest = findLateRecords(records)
	return {heading: 'Latest',
  content: <Record {...latest} viewMoreHeading="View other late records" />
}
}

const estimateThroughput = ({records, distribution}) => {
	return !(distribution.breeding > 2 || distribution.winter > 2) ?  {
		heading: 'Estimated total throughput',
		content: <ul>
  {Object.entries(throughput(records)).map(([name, value]) => (
    <li>
      <breeding>{name}</breeding>
      : 
      {' '}
      {value}
    </li>
))}
</ul>
	} : null
}


export const Autumn = ({records, distribution, breedingSites}) => {
	breedingSites = breedingSites.map(({location}) => location)
	const passageMonths = [7, 8, 9, 10]
	if (distribution.breeding < 3) {
		passageMonths.unshift(6)
	}
	if (!distribution.winter < 2) {
		passageMonths.push(11, 12)
	}

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
    		breedingSites
    	})]
    }
    postContent={
			[estimateThroughput({records, distribution}),getLates({
    		records,
    		distribution,
    	})]
}
  />
)
}


