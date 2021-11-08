<script>
	import { TabPane } from 'sveltestrap';
	import Entry from '../aggregates/Entry.svelte';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let rawRecords;
</script>

<TabPane tabId="whole-year" tab="Whole year" active>
	<Entry {rawRecords} />
</TabPane>
