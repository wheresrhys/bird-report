<script>
	import { Accordion, AccordionItem } from '@sveltestrap/sveltestrap';
	import RecordsByDay from '../aggregates/RecordsByDay.svelte';
	import { group, sortPropAsc } from '../../lib/data-tools';
	import Heatmap from './Heatmap.svelte'

	
	/**
	 * @typedef {Object} Props
	 * @property {import('../../lib/data-tools').Record[]} [records]
	 * @property {boolean} [fullFat]
	 * @property {boolean} [includeHeatmap]
	 * @property {boolean} [isWidespread]
	 */

	/** @type {Props} */
	let {
		records = [],
		fullFat = false,
		includeHeatmap = false,
		isWidespread = false
	} = $props();

	let sites = $derived(group(records.sort(sortPropAsc('date')).sort(sortPropAsc('location')), ({location}) => location));
</script>
<h2>View by site</h2>
<Accordion>
	{#each sites as site}
		<AccordionItem>
			{#snippet header()}
						<div >
					{site[0].location}{#if includeHeatmap}
					{#if !isWidespread}<Heatmap records={site} />{/if}
				{/if}
			</div>
					{/snippet}
			{#if isWidespread}<Heatmap records={site} />{/if}
			<RecordsByDay records={site} isCollapsible={false} dateFormat="month-day"/>
		</AccordionItem>
	{/each}
</Accordion>

<style>
	.accordion-item--empty {
		opacity: 0.5;
	}
	.accordion-item--empty .accordion-header .accordion-button::after {
		display: none;
	}
</style>
