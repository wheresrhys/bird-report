<script>
	import { TabPane } from '@sveltestrap/sveltestrap';
	import Months from '../UI/Months.svelte';

	
	/**
	 * @typedef {Object} Props
	 * @property {import('../../lib/data-tools').Record[]} [records]
	 */

	/** @type {Props} */
	let { records = [] } = $props();
</script>

<TabPane tabId="months" tab="Individual months">
	<Months {records} fullFat={true} />
</TabPane>
