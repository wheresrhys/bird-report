<script>
	import Season from '../aggregates/Season.svelte';
	import { SPRING, WINTER, BREEDING } from '../../lib/constants';
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
	 * @return {Stat[]}
	 */
	const getPreStats = (records) => {
		if (settings[WINTER] >= 1) return [];
		const earlyRecords = findEarlyRecords(records)

		return earlyRecords.length? [
			{
				heading: 'Earliest',
				content: {
					records: earlyRecords,
					viewMoreHeading: 'Other early records'
				}
			}
		]: [];
	};

	/**
	 * @param {Record[]} records
	 * @param {string[]} breedingSites
	 * @return {Stat[]}
	 */
	const getPostStats = (records, breedingSites) => {
		const stats = [];
		if (!(settings[BREEDING] > 2 || settings[WINTER] > 2)) {
			stats.push(throughput(records));
		}
		if (settings[BREEDING] <= 2) {
			const lateRecords = findLateRecords(
						records.filter(({ location }) => !breedingSites.includes(location))
					);
			if (lateRecords.length) {
			stats.push({
				heading: settings[BREEDING] > 0 ? 'Latest non breeding' : 'Latest',
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
		const passageMonths = [4, 5];
		if (!settings[BREEDING]) {
			passageMonths.push(6);
		}
		if (!settings[WINTER]) {
			passageMonths.unshift(2, 3);
		}
		return passageMonths;
	};

	$: passageMonths = getPassageMonths(settings);
	$: relevantRecords = getMonthsOfRecords(records, ...passageMonths);
	$: preStats = getPreStats(relevantRecords);
	$: postStats = getPostStats(relevantRecords, breedingSites);
</script>

<ContentOrSettings {settings} {bird} season={SPRING}>
	<Season
		heading="Spring passage"
		months={passageMonths}
		records={relevantRecords}
		{preStats}
		{postStats}
		isWidespread={settings.spring === 4}
	/>
</ContentOrSettings>
