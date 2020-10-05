import React from 'react'
import {throughput, getMonthsOfRecords, findLateRecords, findEarlyRecords} from '../lib/data-tools'
import {Season} from './Season'
import { Record} from './Records'

const getEarlies = ({records, distribution}) => {
	if (distribution.winter) return null
	const earlies = findEarlyRecords(records)
	return {
		heading: 'Earliest',
		 content: <Record {...earlies} viewMoreHeading="View other early records" />
	}
}

const getLates = ({records, distribution, breedingSites}) => {
	if (distribution.breeding > 2) return null
	const latest = findLateRecords(records.filter(({location}) => !breedingSites.includes(location)))
	return {
		heading: distribution.breeding ? 'Latest non breeding' : 'Latest',
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

export const Spring = ({records, distribution, breedingSites}) => {
	breedingSites = breedingSites.map(({location}) => location)
	const passageMonths = [ 4, 5]
	if (!distribution.breeding) {
		passageMonths.push(6)
	}
	if (!distribution.winter) {
		passageMonths.unshift(2, 3)
	}

	records = getMonthsOfRecords(records, ...passageMonths)

	return (
  <Season
    heading="Spring passage"
    months={passageMonths}
    records={records}
    preContent={
    	[getEarlies({
    		records,
    		distribution,
    	})]
    }
    postContent={
			[estimateThroughput({records, distribution}), getLates({
    		records,
    		distribution,
    		breedingSites
    	})]
}
  />
)

}

