<script>
	import { TabPane, Input } from '@sveltestrap/sveltestrap';
	import { group, sortPropAsc ,
		getNumberOfSites,
		getOutliers,getMonthsOfRecords
	} from '../../lib/data-tools';
	import { COUNTIES } from '../../lib/constants';
	import moment from 'moment';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;

	let superConcise = false
	let countySummaries;

	const numberMap = {
		1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten'
	}

	const siteNameAbbreviations = {
		'King George V Reservoir': 'KGV Res', 'King George VI Reservoir': 'KGVI Res', 'Queen Elizabeth II Reservoir':'QE II Res', 'Queen Mary Reservoir': 'Q. Mary Res', 'Queen Mother Reservoir': 'Q. Mother Res',
		 'Hyde Park & Kensington Gardens': 'Hyde Park/Kensington Gdns'
	}

	const siteNamePatternAbbreviations = Object.entries({
		'Reservoir': 'Res',
		'Gardens': 'Gdns',
		'Open Space': 'OS',
		'Gravel Pits': 'GP',
		'Gravel Pit': 'GP',
		'Local Nature Reserve': 'LNR',
		'Nature Reserve': 'NR',
		'Wildfowl Reserve': 'WR',
		'Country Park': 'CP',
		'Sand Pits': 'SP',
		'Sand Pit': 'SP',
		'Sewage Works': 'SW',
		'Golf Course': 'GC',
		'Filter Beds': 'FB',
		'Natural Park': 'NP'
	})

	function abbreviateSiteName (name) {
		if (name in siteNameAbbreviations) return siteNameAbbreviations[name];
		siteNamePatternAbbreviations.forEach(([original, replacement]) => {
			name = name.replace(original, replacement);
		})
		return name;
	}

	function groupSingles (records) {
		const groupings = [];
		let currentGroup = [];
		let currentCount;

		records.forEach(record => {
			const count = Math.round(record.numberIndex);
			currentCount = currentCount || count
			if (count === currentCount) {
				currentGroup.push(record)
			} else {
				groupings.push(currentGroup)
				currentGroup = [record]
				currentCount = undefined;
			}
		})
		groupings.push(currentGroup)
		return groupings.filter(grouping => grouping.length);
	}

	function printCount (numberIndex) {
		return numberMap[Math.round(numberIndex)] || numberIndex;
	}

	function summariseSingleRecord (record) {
		return `${printCount(record.numberIndex)} on ${moment(record.date).format('MMM Do')}`
	}

	function cleverCommas (list) {
		if (list.length === 1) return list[0];
		const firstItems = [...list];
		const lastItem = firstItems.pop();
		return `${firstItems.join(', ')} and ${lastItem}`
	}

	function summariseSite (site) {
		if (site.length === 1) {
			return `${abbreviateSiteName(site[0].location)}, ${summariseSingleRecord(site[0])}. `;
		} else {
			const recordClusters = groupSingles(site);
			const recordClusterSummaries = recordClusters.map(cluster => {
				if (cluster.length === 1) return summariseSingleRecord(cluster[0])
				if (cluster[0].numberIndex <= 1) return `singles on ${cleverCommas(cluster.map(record => moment(record.date).format('MMM Do')))}`;
				return  `${printCount(cluster[0].numberIndex)} on ${cleverCommas(cluster.map(record => moment(record.date).format('MMM Do')))}`
			});

			return `${abbreviateSiteName(site[0].location)}, ${cleverCommas(recordClusterSummaries)}. `;
		}

	}

	function summariseCounty (countyRecords) {
		return group(countyRecords.sort(sortPropAsc('date')).sort(sortPropAsc('location')), ({location}) => location).map(summariseSite).join('')
	}

function conciseSummariseCounty (countyRecords) {
	const springSites = getNumberOfSites(getMonthsOfRecords(countyRecords, 2, 3, 4, 5, 6));
	const autumnSites = getNumberOfSites(getMonthsOfRecords(countyRecords, 7, 8, 9, 10, 11));
	const highSingleSiteCounts = getOutliers(countyRecords, 'numberIndex', {tolerance: 2});
	const highSingleSiteCountsString = highSingleSiteCounts.map(({location, numberIndex, date}) => `${location}, ${printCount(numberIndex)} on ${moment(date).format('MMM Do')}.`).join(' ');
	return  `Spring ${printCount(springSites)} sites, autumn ${printCount(autumnSites)} sites. ${highSingleSiteCountsString}`
}



	function generateCountySummaries (allCounties, superConcise) {
		countySummaries = allCounties.map(({countyCode, countyText, countyRecords }) => {
			return {
					countyCode,
					countyText,
					countySummary: superConcise ? conciseSummariseCounty(countyRecords) : summariseCounty(countyRecords)
				};
		})
	}

	$: allCounties = Object.entries(COUNTIES)
			.filter(([county]) => records.length < 300 ? county !== 'ALL' : county === 'IL')
			.map(([countyCode, countyText]) => {
				const countyRecords = records
					.filter(({ viceCounty }) =>
						 viceCounty === countyCode
					)

				return {
					countyCode,
					countyText,
					countyRecords
				};
			})

	$: generateCountySummaries(allCounties, superConcise)

</script>

<TabPane tabId="text-blocks" tab="Text blocks">
	 <p><em>To avoid this page crashing, birds with greater than 300 records only generate these text blocks for inner london. If you want to see it output for a different county, apply the county filter at the top of the page first</em></p>

	 <p><em>Records of the same number at the same site on consecutive dates will need tidying</em></p>
	 <Input
  disabled={false}
  invalid={false}
  plaintext={false}
  reverse={false}
  type="switch"
  valid={false}
  label="Summarize sites"
  name="superConcise"
	id="superConcise"
  bind:checked={superConcise} />

	<ul>
	{#each countySummaries as {countyCode, countyText, countySummary}}
		<li><b>{countyText}: </b>
				{countySummary}
		</li>
	{/each}
	<ul>
</TabPane>
