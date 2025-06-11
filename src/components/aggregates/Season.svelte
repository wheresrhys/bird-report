<script>
	import Entry from './Entry.svelte';
	import Sites from '../UI/Sites.svelte'
	import { getMonthsOfRecords } from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @typedef {import('../../lib/data-tools').Stat} Stat*/

	

	

	

	

	
	/**
	 * @typedef {Object} Props
	 * @property {Record[]} [records]
	 * @property {number[]} months
	 * @property {any} isWidespread
	 * @property {string} heading
	 * @property {Stat[]} [preStats]
	 * @property {Stat[]} [postStats]
	 */

	/** @type {Props} */
	let {
		records = [],
		months,
		isWidespread,
		heading,
		preStats = [],
		postStats = []
	} = $props();

	/** @type {string[]} */
	const MONTH_NAMES = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	/**
	 * @param {number[]} months
	 * @returns {string}
	 */
	const monthsToNames = (months) =>
		`${MONTH_NAMES[months[0] - 1]} to ${
			MONTH_NAMES[months[months.length - 1] - 1]
		}`;

	let relevantRecords = $derived(getMonthsOfRecords(records, ...months))
</script>

<section>
	<h2>
		{heading}: {monthsToNames(months)}
	</h2>

	<Entry
		records={relevantRecords}
		{preStats}
		{postStats}
		groupByMonth={true}
	/>
	<Sites records={relevantRecords} includeHeatmap={true} {isWidespread}/>
</section>
