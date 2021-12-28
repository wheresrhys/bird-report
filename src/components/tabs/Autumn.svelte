<script>
	import { TabPane } from 'sveltestrap';
	import Season from '../aggregates/Season.svelte';
	import { AUTUMN, WINTER, BREEDING } from '../../lib/constants';
	import {
		getMonthsOfRecords,
	} from '../../lib/data-tools';

	import {
		throughput,
		findLateRecords,
		findEarlyRecords
	} from '../../lib/migration';

	/** @typedef {import('../../lib/data-tools').Record} Record*/
	/** @typedef {import('../../lib/data-tools').Stat} Stat*/
	/** @typedef {import('../../lib/settings').Settings} Settings*/

	/** @type {Record[]} */
	export let records = [];
	/** @type {Settings} */
	export let settings;
	/** @type {string[]} */
	export let breedingSites
	/**
	 * @param {Record[]} records
	 * @param {string[]} breedingSites
	 * @return {Stat[]}
	 */
	const getPreStats = (records, breedingSites) => {
		if (settings[BREEDING] > 2) return [];

		return [
			{
				heading: settings[BREEDING] > 0 ? 'Earliest non breeding' : 'Earliest',
				content: {
					records: findEarlyRecords(records.filter(({ location }) => !breedingSites.includes(location))),
					viewMoreHeading: 'Other early records'
				}
			}
		];
	};

	/**
	 * @param {Record[]} records
	 * @return {Stat[]}
	 */
	const getPostStats = (records) => {
		const stats = [];
		if (!(settings[BREEDING] > 2 || settings[WINTER] > 2)) {
			stats.push(...throughput(records));
		}
		if (settings[WINTER] <= 0) {
			stats.push({
				heading: 'Latest',
				content: {
					records: findLateRecords(
						records
					),
					viewMoreHeading: 'Other late records'
				}
			});
		}

		return stats;
	};
	/**
	 * @param {Settings} settings
	 * @return {number[]}
	 */
	const getPassageMonths = (settings) => {

		const passageMonths = [7, 8, 9, 10];
		if (settings[BREEDING] < 3) {
			passageMonths.unshift(6);
		}
		if (settings[WINTER] < 2) {
			passageMonths.push(11, 12);
		}
		return passageMonths;
	};


	$: passageMonths = getPassageMonths(settings);
	$: relevantRecords = getMonthsOfRecords(records, ...passageMonths);
	$: preStats = getPreStats(relevantRecords, breedingSites);
	$: postStats = getPostStats(relevantRecords);
</script>

<TabPane tabId="autumn" tab="Autumn passage" disabled={settings[AUTUMN] < 1}>
	{#if settings[AUTUMN] >= 1}
		<Season
			heading="Autumn passage"
			months={passageMonths}
			records={relevantRecords}
			{preStats}
			{postStats}
		/>
	{:else}
		Not a autumn passage migrant
	{/if}
</TabPane>
