<script>
	import { TabPane } from 'sveltestrap';
	import Season from '../aggregates/Season.svelte';
	import Record from '../aggregates/Records.svelte';
	import { SPRING, WINTER } from '../../lib/constants';
	import {
		getBreedingSites,
		throughput,
		getMonthsOfRecords,
		findLateRecords,
		findEarlyRecords,
		clean
	} from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;
	export let settings;

	const getPreStats = (records) => {
		if (settings[WINTER] >= 1) return [];

		return [
			{
				heading: 'Earliest',
				content: {
					records: findEarlyRecords(records),
					viewMoreHeading: 'Other early records'
				}
			}
		];
	};

	const getPostStats = (records, breedingSites) => {
		const stats = [];
		//       if (!(settings.breeding > 2 || settings.winter > 2)) {
		//          stats.push({
		//           heading: 'Estimated total throughput',
		//           content: <ul>
		// //   {Object.entries(throughput(records)).map(([name, value]) => (
		// //     <li>
		// //       <b>{name}</b>
		// //       :
		// //       {' '}
		// //       {value}
		// //     </li>
		// // ))}
		// // </ul>
		//         })
		//       }
		if (settings.breeding <= 2) {
			stats.push({
				heading: settings.breeding > 0 ? 'Latest non breeding' : 'Latest',
				content: {
					records: findLateRecords(
						records.filter(({ location }) => !breedingSites.includes(location))
					),
					viewMoreHeading: 'Other late records'
				}
			});
		}

		return stats;
	};

	const getPassageMonths = (settings) => {
		const passageMonths = [4, 5];
		if (!settings.breeding) {
			passageMonths.push(6);
		}
		if (!settings.winter) {
			passageMonths.unshift(2, 3);
		}
		return passageMonths;
	};
	$: records = clean(rawRecords);
	$: breedingSites = getBreedingSites(records, settings).map(
		({ location }) => location
	);
	$: passageMonths = getPassageMonths(settings);
	$: preStats = getPreStats(records);
	$: postStats = getPostStats(records, breedingSites);
</script>

<TabPane tabId="spring" tab="Spring passage" disabled={settings[SPRING] < 1}>
	{#if settings[SPRING] >= 1}
		<Season
			heading="Spring passage"
			months={passageMonths}
			rawRecords={getMonthsOfRecords(rawRecords, ...passageMonths)}
			{preStats}
			{postStats}
		/>
	{:else}
		Not a spring passage migrant
	{/if}
</TabPane>
