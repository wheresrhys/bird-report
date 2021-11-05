<script>
	import Records from './Records.svelte';
	/** @type {import('../lib/data-tools').Record[]} */
	export let records;
</script>

<Records {records} heading="View all records" />
