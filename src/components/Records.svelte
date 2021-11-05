<script>
	import Record from './Record.svelte';
	/** @type {import('../lib/data-tools').Record[]} */
	export let records;
	/** @type {string} */
	export let heading;
</script>

<h3>{heading}</h3>
<ul>
	{#each records as record}
		<li><Record {...record} /></li>{/each}
</ul>
