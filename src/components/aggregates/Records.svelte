<script>
	import Record from './Record.svelte';
	import { Collapse } from 'sveltestrap';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;
	export let isOpen = false;
	/** @type {string} */
	export let viewMoreHeading = 'View detail';
	/** @type {string[]} */
	export let parentAggregationTypes = [];
</script>

<button on:click={() => (isOpen = !isOpen)} class="link">
	{viewMoreHeading}
</button>
<Collapse {isOpen}>
	<ul>
		{#each records as record}
			<li><Record {...record} {parentAggregationTypes} /></li>{/each}
	</ul>
</Collapse>

<style>
	.link {
		outline: none;
		border: none;
		padding: none;
		text-decoration: underline;
		color: blue;
		background: none;
	}
</style>
