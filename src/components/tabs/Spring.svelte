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

	
	
	
	/**
	 * @typedef {Object} Props
	 * @property {Record[]} [records]
	 * @property {Settings} settings
	 * @property {string[]} breedingSites
	 * @property {any} bird
	 */

	/** @type {Props} */
	let {
		records = [],
		settings,
		breedingSites,
		bird
	} = $props();
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

	let passageMonths = $derived(getPassageMonths(settings));
	let relevantRecords = $derived(getMonthsOfRecords(records, ...passageMonths));
	let preStats = $derived(getPreStats(relevantRecords));
	let postStats = $derived(getPostStats(relevantRecords, breedingSites));
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
