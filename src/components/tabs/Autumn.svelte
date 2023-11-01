<script>
	import { TabPane } from 'sveltestrap';
	import Season from '../aggregates/Season.svelte';
	import { AUTUMN, WINTER, BREEDING } from '../../lib/constants';
	import { getMonthsOfRecords } from '../../lib/data-tools';
	import ContentOrSettings from '../UI/ContentOrSettings.svelte';

	import {
		throughput,
		findLateRecords,
		findEarlyRecords
	} from '../../lib/migration';

	/** @typedef {import('../../lib/data-tools').Record} Record*/
	/** @typedef {import('../../lib/data-tools').Stat} Stat*/
	/** @typedef {import('../../lib/bird-settings').Settings} Settings*/

	/** @type {Record[]} */
	export let records = [];
	/** @type {Settings} */
	export let settings;
	/** @type {string[]} */
	export let breedingSites;
	export let bird;
	/**
	 * @param {Record[]} records
	 * @param {string[]} breedingSites
	 * @return {Stat[]}
	 */
	const getPreStats = (records, breedingSites) => {
		if (settings[BREEDING] > 2) return [];
		const earlyRecords = findEarlyRecords(
						records.filter(({ location }) => !breedingSites.includes(location))
					)

		return earlyRecords.length ? [
			{
				heading: settings[BREEDING] > 0 ? 'Earliest non breeding' : 'Earliest',
				content: {
					records: earlyRecords,
					viewMoreHeading: 'Other early records'
				}
			}
		] : [];
	};

	/**
	 * @param {Record[]} records
	 * @return {Stat[]}
	 */
	const getPostStats = (records) => {
		const stats = [];
		if (!(settings[BREEDING] > 2 || settings[WINTER] > 2)) {
			stats.push(throughput(records));
		}


		if (settings[WINTER] <= 0) {
			const lateRecords = findLateRecords(records);
			if (lateRecords.length) {
			stats.push({
				heading: 'Latest',
				content: {
					records: lateRecords,
					viewMoreHeading: 'Other late records'
				}
			});
		}
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

<ContentOrSettings {settings} {bird} season={AUTUMN}>
	<Season
		heading="Autumn passage"
		months={passageMonths}
		records={relevantRecords}
		{preStats}
		{postStats}
		isWidespread={settings.autumn === 4}
	/>
</ContentOrSettings>
