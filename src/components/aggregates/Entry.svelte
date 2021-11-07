<script>
	import { Table } from 'sveltestrap';
	import NotableRecords from './NotableRecords.svelte';
	import Records from './Records.svelte';
	import Record from './Record.svelte';
	import { group, getOutliers, sortPropDesc } from '../../lib/data-tools';

	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @typedef {import('../../lib/data-tools').AggregateRecord} AggregateRecord */

	/** @type {Record[]} */
	export let records;
	export let preStats = [];
	export let postStats = [];

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
	 * @param {function} func
	 * @returns {(records: Record[]) => AggregateRecord}
	 */
	const aggregateByDay = (func) => (records) => {
		records = group(records, ({ date }) => date.toISOString())
			.map((records) => ({
				records,
				date: records[0].date,
				numberIndex: func(records)
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

	let stats = [...preStats];

	if (records.length) {
		const maxCitywideDayCount = aggregateByDay(countBirds)(records);

		const numberOfSites = getNumberOfSites(records);
		const highSingleSiteCounts = getOutliers(records, 'numberIndex');

		stats.push({ heading: 'Number of sites', content: numberOfSites });
		if (numberOfSites > 1) {
			stats.push({
				heading: 'Max citywide sites in day',
				component: Record,
				content: {
					...aggregateByDay(countRecords)(records),
					viewMoreHeading: 'View other high counts'
				}
			});
		}
		if (maxCitywideDayCount.numberIndex > 1) {
			stats.push({
				heading: 'Max citywide day count',
				component: Record,
				content: {
					...maxCitywideDayCount,
					viewMoreHeading: 'View other high counts'
				}
			});
		}

		if (highSingleSiteCounts[0].numberIndex > 1) {
			stats.push({
				heading: 'High single site counts',
				component: NotableRecords,
				content: {
					records: highSingleSiteCounts,
					viewMoreHeading: 'View other high counts'
				}
			});
		}
	}
	$: stats.push(...postStats);
</script>

<Table>
	<tbody>
		{#each stats as stat}
			<tr>
				<th>{stat.heading}</th>
				<td
					>{#if stat.component}<svelte:component
							this={stat.component}
							{...stat.content}
						/>{:else}{stat.content}{/if}</td
				>
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
