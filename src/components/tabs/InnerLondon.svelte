<script>
	import { TabPane } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	import { clean } from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;

	/** @type {Record[]} */
	$: londonRecords = clean(
		rawRecords.filter(({ viceCounty }) => viceCounty === 'IL')
	);
</script>

<TabPane tabId="inner-london" tab="Inner london">
	<Records records={londonRecords} isOpen={true} />
</TabPane>
