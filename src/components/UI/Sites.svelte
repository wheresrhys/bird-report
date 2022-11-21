<script>
	import { Accordion, AccordionItem } from 'sveltestrap';
	import Entry from '../aggregates/Entry.svelte';
	import RecordsByDay from '../aggregates/RecordsByDay.svelte';
	import { group, sortPropAsc } from '../../lib/data-tools';
	import Heatmap from './Heatmap.svelte'

	/** @type {import('../../lib/data-tools').Record[]} */
	export let records = [];
	export let fullFat = false;
	export let includeHeatmap = false;

	$: sites = group(records.sort(sortPropAsc('date')).sort(sortPropAsc('location')), ({location}) => location);
</script>
<h2>View by site</h2>
<Accordion>
	{#each sites as site}
		<AccordionItem>
			<div slot="header">
				{site[0].location}{#if includeHeatmap}
				<Heatmap records={site} />
			{/if}
		</div>

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
