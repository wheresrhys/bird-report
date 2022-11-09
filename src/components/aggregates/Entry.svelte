<script>
	import { Table } from 'sveltestrap';
	import NotableRecords from './NotableRecords.svelte';
	import Records from './Records.svelte';
	import Months from '../UI/Months.svelte';
	import Sites from '../UI/Sites.svelte';
	import RecordsByDay from './RecordsByDay.svelte';
	import {
		getNumberOfSites,
		countRecords,
		countBirds,
		aggregateByDay,
		getOutliers
	} from '../../lib/data-tools';
	import { county } from '../../lib/stores.js';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @typedef {import('../../lib/data-tools').Stat} Stat*/

	/** @type {Record[]} */
	export let records = [];

	export let groupByDay = false;
	export let groupByMonth = false;
	export let groupBySite = false;
	export let viewMoreHeading = 'View all records';

	/** @type {Stat[]} */
	export let preStats = [];
	/** @type {Stat[]} */
	export let postStats = [];

	/** @type {Stat[]} */
	let stats = [];
	let tolerance = 2;

	$: tolerance = $county === 'ALL' ? 2 : 1;
	$: if (records.length) {
		stats = [...preStats];
		let numberOfSites = getNumberOfSites(records);
		let highCitywideDayCounts = aggregateByDay(records, countBirds, {tolerance});
		let highSingleSiteCounts = getOutliers(records, 'numberIndex', {tolerance});

		stats = [
			...stats,
			{ heading: 'Number of records', content: records.length },
			{ heading: 'Number of sites', content: numberOfSites }
		];
		if (numberOfSites > 1) {
			stats = [
				...stats,
				{
					heading: 'Max citywide sites in day',
					content: {
						records: aggregateByDay(records, countRecords).records,
						viewMoreHeading: 'Other high counts'
					}
				}
			];
		}
		if (highCitywideDayCounts.numberIndex > 1) {
			stats = [
				...stats,
				{
					heading: 'Max citywide day count',
					content: {
						records: highCitywideDayCounts.records,
						viewMoreHeading: 'Other high counts'
					}
				}
			];
		}

		if (highSingleSiteCounts[0].numberIndex > 1) {
			stats = [
				...stats,
				{
					heading: 'High single site counts',
					content: {
						records: highSingleSiteCounts,
						viewMoreHeading: 'Other high counts'
					}
				}
			];
		}
		stats = [...stats, ...postStats];
	}
</script>

<Table>
	<tbody>
		{#each stats as stat}
			<tr>
				<th>{stat.heading}</th>
				<td>

					{#if stat.stats}
						{#each stat.stats as stat}
							<b>{stat.heading}:</b> {stat.content}<br />
						{/each}
					{:else if stat.content.records}
						<NotableRecords {...stat.content} />
					{:else}
						{stat.content}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</Table>

{#if groupByMonth}
	<Months {records} fullFat={false}/>
{:else if groupByDay}
	<RecordsByDay {records} {viewMoreHeading}/>
{:else}
	<Records {records} {viewMoreHeading} />
{/if}
<Sites {records} {viewMoreHeading} />

<style>
	th {
		min-width: 100px;
	}
</style>
