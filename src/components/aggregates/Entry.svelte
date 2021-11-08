<script>
	import { Table } from 'sveltestrap';
	import NotableRecords from './NotableRecords.svelte';
	import Records from './Records.svelte';
	import { group, getOutliers, sortPropDesc } from '../../lib/data-tools';

	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @typedef {import('../../lib/data-tools').AggregateRecord} AggregateRecord */

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

	/**
	 * @param {Record[]} records
	 * @returns {number}
	 */
	const getNumberOfSites = (records) => {
		const sites = new Set();
		records.forEach(({ location }) => sites.add(location));
		return [...sites].length;
	};

	/**
	 * @param {Record[]} records
	 * @returns {number}
	 */
	const countRecords = (records) => records.length;

	/**
	 * @param {Record[]} records
	 * @returns {number}
	 */
	const countBirds = (records) =>
		records.reduce((sum, { numberIndex }) => sum + numberIndex, 0);

	/**
	 * @param {Record[]} records
	 * @returns {AggregateRecord}
	 */
	const aggregate = (records) => {
		records = [...records].sort(sortPropDesc('numberIndex'));
		const maxNumberIndex = records[0].numberIndex;
		const occasions = records.filter(
			({ numberIndex }) => numberIndex === maxNumberIndex
		);

		return {
			...records[0],
			...(occasions.length > 1
				? {
						dates: occasions.map(({ date }) => date),
						locations: occasions.map(({ location }) => location)
				  }
				: {}),
			records: getOutliers(records, 'numberIndex')
		};
	};
	/**
	 * @param {Record[]} records
	 * @param {function} func
	 * @returns {AggregateRecord}
	 */
	const aggregateByDay = (records, func) => {
		records = group(records, ({ date }) => date.toISOString())
			.map((records) => ({
				records,
				date: records[0].date,
				numberIndex: func(records),
				aggregationType: 'same day'
			}))
			.sort(sortPropDesc('numberIndex'));

		if (!records.length) {
			return {
				numberIndex: 0,
				records: []
			};
		}
		return aggregate(records);
	};

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
