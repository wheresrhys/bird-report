<script>
	import Record from './Record.svelte';
	import Records from './Records.svelte';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	
	
	/**
	 * @typedef {Object} Props
	 * @property {Record[]} [records]
	 * @property {string} viewMoreHeading
	 */

	/** @type {Props} */
	let { records = [], viewMoreHeading } = $props();
	let topRecord = $derived(records[0]);

	let otherNotableRecords = $derived(records.slice(1));
</script>

<Record {...topRecord} />
{#if otherNotableRecords.length}
	<Records records={otherNotableRecords} {viewMoreHeading} />
{/if}
