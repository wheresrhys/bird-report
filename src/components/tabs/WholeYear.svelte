<script>
	import { TabPane } from '@sveltestrap/sveltestrap';
	import Entry from '../aggregates/Entry.svelte';
	import Sites from '../UI/Sites.svelte'
	
	/**
	 * @typedef {Object} Props
	 * @property {import('../../lib/data-tools').Record[]} records
	 */

	/** @type {Props} */
	let { records } = $props();
</script>

<TabPane tabId="whole-year" tab="Whole year" active>
	<Entry {records} />
	<Sites records={records} /><!--  includeHeatmap={true}/> -->
</TabPane>
