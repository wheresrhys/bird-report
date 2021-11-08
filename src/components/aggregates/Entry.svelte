<script>
	import { Table } from 'sveltestrap';
	import NotableRecords from './NotableRecords.svelte';
	import Records from './Records.svelte';
	import {
		getNumberOfSites,
		countRecords,
		countBirds,
		aggregate,
		aggregateByDay,
		group,
		getOutliers,
		sortPropDesc
	} from '../../lib/data-tools';

	/** @typedef {import('../../lib/data-tools').Record} Record */

	// TODO: expect a svelte component in the component property
	/**
	 * @typedef {Object} Stat
	 * @property {string} heading
	 * @property {Object} [component]
	 * @property {Object} content
	 */

	/** @type {Record[]} */
	export let records;
	/** @type {Stat[]} */
	export let preStats = [];
	/** @type {Stat[]} */
	export let postStats = [];

	/** @type {Stat[]} */
	let stats = [];

	$: if (records.length) {
		stats = [...preStats];
		let numberOfSites = getNumberOfSites(records);
		let highCitywideDayCounts = aggregateByDay(records, countBirds);
		let highSingleSiteCounts = getOutliers(records, 'numberIndex');

		stats = [...stats, { heading: 'Number of sites', content: numberOfSites }];
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
					{#if stat.content.records}
						<NotableRecords {...stat.content} />
					{:else}
						{stat.content}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</Table>

<Records {records} viewMoreHeading="View all records" />

<style>
	th {
		min-width: 100px;
	}
</style>
