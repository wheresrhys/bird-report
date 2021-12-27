<script>
	import Record from './Record.svelte';
	import { Collapse } from 'sveltestrap';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @type {Record[]} */
	export let records;
	export let isCollapsible = true;
	export let isOpen = !isCollapsible;
	/** @type {string} */
	export let viewMoreHeading = 'View detail';
	/** @type {string[]} */
	export let parentAggregationTypes = [];
</script>

{#if isCollapsible}
	<button on:click={() => (isOpen = !isOpen)} class="link">
		{viewMoreHeading}
	</button>
{/if}
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
