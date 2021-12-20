<script>
	import { TabPane } from 'sveltestrap';
  import Season from '../aggregates/Season.svelte'
  import Record from '../aggregates/Records.svelte'
  import {SPRING, WINTER} from '../../lib/constants'
  import {getBreedingSites, throughput, getMonthsOfRecords, findLateRecords, findEarlyRecords, clean} from '../../lib/data-tools'
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;
  export let settings;

  const getPreStats = (records) => {
    if (settings[WINTER] >= 1) return []

    const earlies = findEarlyRecords(records)
    return [{
      heading: 'Earliest',
      content: {
        records: earlies,
        viewMoreHeading: 'Other early records'
      }
    }]
  }



  const getLates = ({records, distribution, breedingSites}) => {
    if (distribution.breeding > 2) return null
    const latest = findLateRecords(records.filter(({location}) => !breedingSites.includes(location)))
    return {
      heading: distribution.breeding ? 'Latest non breeding' : 'Latest',
      // content: <Record {...latest} viewMoreHeading="View other late records" />
    }
  }

  const estimateThroughput = ({records, distribution}) => {
  return !(distribution.breeding > 2 || distribution.winter > 2) ?  {
    heading: 'Estimated total throughput',
//     content: <ul>
//   {Object.entries(throughput(records)).map(([name, value]) => (
//     <li>
//       <b>{name}</b>
//       :
//       {' '}
//       {value}
//     </li>
// ))}
// </ul>
  } : null
}

  const getPassageMonths = (settings) => {
    const passageMonths = [ 4, 5 ]
    if (!settings.breeding) {
      passageMonths.push(6)
    }
    if (!settings.winter) {
      passageMonths.unshift(2, 3)
    }
    return passageMonths
  }
  $: records = clean(rawRecords)
  $: breedingSites = getBreedingSites(records, settings).map(({location}) => location)
  $: passageMonths = getPassageMonths(settings)
  $: preStats = getPreStats(records)

  $: records = clean(getMonthsOfRecords(rawRecords, ...passageMonths))


</script>

<TabPane tabId="spring" tab="Spring passage" disabled={settings[SPRING] < 1}>
  {#if settings[SPRING] >= 1}


      <Season
    heading="Spring passage"
    months={passageMonths}
    {rawRecords}
    {preStats}
  />
   <!--
    postStats={
      [estimateThroughput({records, distribution}), getLates({
        records,
        distribution,
        breedingSites
      })]
} -->
  {:else}
    Not a spring passage migrant
  {/if}
</TabPane>






