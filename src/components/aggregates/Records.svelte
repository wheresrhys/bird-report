<script>
	import Record from './Record.svelte';
	import { Collapse } from '@sveltestrap/sveltestrap';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	
	
	
	/**
	 * @typedef {Object} Props
	 * @property {Record[]} records
	 * @property {boolean} [isCollapsible]
	 * @property {any} [isOpen]
	 * @property {string} [viewMoreHeading]
	 * @property {string[]} [parentAggregationTypes]
	 */

	/** @type {Props} */
	let {
		records,
		isCollapsible = true,
		isOpen = $bindable(!isCollapsible),
		viewMoreHeading = 'View detail',
		parentAggregationTypes = []
	} = $props();
</script>

{#if isCollapsible}
	<button onclick={() => (isOpen = !isOpen)} class="link">
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
