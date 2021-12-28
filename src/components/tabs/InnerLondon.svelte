<script>
	import { TabPane } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let records;

	/** @type {Record[]} */
	$: innerLondonRecords = records.filter(
		({ viceCounty }) => viceCounty === 'IL'
	);
</script>

<TabPane tabId="inner-london" tab="Inner london">
	<Records records={innerLondonRecords} isOpen={true} />
</TabPane>
