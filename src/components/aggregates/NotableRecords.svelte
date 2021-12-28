<script>
	import Record from './Record.svelte';
	import Records from './Records.svelte';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @type {Record[]} */
	export let records = [];
	/** @type {string} */
	export let viewMoreHeading;
	$: console.log(records);
	$: topRecord = records[0];

	$: otherNotableRecords = records.slice(1);
</script>

<Record {...topRecord} />
{#if otherNotableRecords.length}
	<Records records={otherNotableRecords} {viewMoreHeading} />
{/if}
