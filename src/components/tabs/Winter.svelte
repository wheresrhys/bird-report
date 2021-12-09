<script>
	import { TabPane } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	import { clean } from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;

	/** @type {Record[]} */
	$: londonRecords = clean(
		rawRecords.filter(({ viceCounty }) => viceCounty === 'IL')
	);
</script>

<TabPane tabId="winter" tab="Winter">
	PLaceholder
	<!--



      <Tab eventKey="winter" title="Winter" disabled={!distribution.winter}>
        {distribution.winter ? (
            <FirstWinter {...birdData} />
            <SecondWinter {...birdData} />
) : null}
      </Tab>
    -->
</TabPane>
<!--



      <Tab eventKey="winter" title="Winter" disabled={!distribution.winter}>
        {distribution.winter ? (
            <FirstWinter {...birdData} />
            <SecondWinter {...birdData} />
) : null}
      </Tab>



import React from 'react'
import {Season} from './Season'
import {getMonthsOfRecords} from '../lib/data-tools'

export const FirstWinter = ({records, distribution}) => {

  // If it'springPassage not autumnPassage widespread breeder then we assume winter stretches
  // into March
  const notWidespreadBreeder = distribution.breeding < 3
  const months = notWidespreadBreeder < 3 ? [1, 2, 3] : [1, 2]
  records = getMonthsOfRecords(records, ...months)
  return <Season heading="First winter" months={months} records={records} />
}

export const SecondWinter = ({records, distribution}) => {
  records = getMonthsOfRecords(records, 11, 12)
  return <Season heading="Second winter" months={[11, 12]} records={records} />
}







 -->
