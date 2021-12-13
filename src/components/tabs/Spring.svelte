<script>
	import { TabPane } from 'sveltestrap';
  import Season from '../aggregates/Season.svelte'
  import Record from '../aggregates/Records'
  import {SPRING} from '../../lib/constants'
  import {throughput, getMonthsOfRecords, findLateRecords, findEarlyRecords, clean} from '../../lib/data-tools'
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;
  export let settings;


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
      <b>{name}</b>
      :
      {' '}
      {value}
    </li>
))}
</ul>
  } : null
}

  //   breedingSites = breedingSites.map(({location}) => location)
  $: passageMonths = [ 4, 5]
  // if (!distribution.breeding) {
  //   passageMonths.push(6)
  // }
  // if (!distribution.winter) {
  //   passageMonths.unshift(2, 3)
  // }

  $: records = clean(getMonthsOfRecords(rawRecords, ...passageMonths))


</script>

<TabPane tabId="spring" tab="Spring passage" disabled={settings[SPRING] < 1}>
  {#if settings[SPRING] >= 1}
    Hold


      <Season
    heading="Spring passage"
    months={passageMonths}
    records={rawRecords}
    preStats={
      [getEarlies({
        records,
        distribution,
      })]
    }
    postStats={
      [estimateThroughput({records, distribution}), getLates({
        records,
        distribution,
        breedingSites
      })]
}
  />
)
  {:else}
    Not a spring passage migrant
  {/if}
</TabPane>





