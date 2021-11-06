<script>
	import { Table } from 'sveltestrap';
	import Records from './Records.svelte';
	import Record from './Record.svelte';
	import { group, getOutliers, sortPropDesc } from '../../lib/data-tools';

	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;
	export let preStats = [];
	export let postStats = [];

	const getNumberOfSites = (records) => {
		const sites = new Set();
		records.forEach(({ location }) => sites.add(location));
		return [...sites].length;
	};

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
		console.log('yay');
		const maxCitywideDayCount = aggregateByDay((records) =>
			records.reduce((sum, { numberIndex }) => sum + numberIndex, 0)
		)(records);

		const numberOfSites = getNumberOfSites(records);
		const highSingleSiteCounts = getOutliers(records, 'numberIndex');

		stats.push({ heading: 'Number of sites', content: numberOfSites });
		if (numberOfSites > 1) {
			stats.push({
				heading: 'Max citywide sites in day',
				component: Record,
				content: aggregateByDay((records) => records.length)(records),
				viewMoreHeading: 'View other high counts'
			});
		}
		if (maxCitywideDayCount.numberIndex > 1) {
			stats.push({
				heading: 'Max citywide day count',
				content: maxCitywideDayCount,
				component: Record,
				viewMoreHeading: 'View other high counts'
			});
		}

		if (highSingleSiteCounts[0].numberIndex > 1) {
			stats.push({
				heading: 'High single site counts',
				content: `{<>
            <Record {...highSingleSiteCounts[0]} />
            <Records records={highSingleSiteCounts.slice(1)} heading="View other high counts"/>
           </>}`
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

<Records {records} heading="View all records" />

<style>
	th {
		minwidth: 100px;
	}
</style>
