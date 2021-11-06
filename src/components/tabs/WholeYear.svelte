<script>
	import { TabPane } from 'sveltestrap';
	import Entry from '../aggregates/Entry.svelte';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;
</script>

<TabPane tabId="whole-year" tab="Whole year" active>
	<Entry {records} />
</TabPane>
