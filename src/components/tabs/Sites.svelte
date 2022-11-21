<script>
	import { TabPane } from 'sveltestrap';
	import Sites from '../UI/Sites.svelte';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;
</script>

<TabPane tabId="sites" tab="Sites" active>
	<Sites {records} />
</TabPane>
