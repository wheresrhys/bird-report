<script>
	import { TabPane } from 'sveltestrap';
	import Months from '../UI/Months.svelte';

	/** @type {import('../../lib/data-tools').Record[]} */
	export let records = [];
</script>

<TabPane tabId="months" tab="Individual months">
	<Months {records} fullFat={true} />
</TabPane>
