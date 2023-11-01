<script>
	import { Accordion, AccordionItem } from 'sveltestrap';
	import Entry from '../aggregates/Entry.svelte';
	import RecordsByDay from '../aggregates/RecordsByDay.svelte';
	import { getMonthsOfRecords } from '../../lib/data-tools';

	const MONTH_NAMES = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	/** @type {import('../../lib/data-tools').Record[]} */
	export let records = [];
	export let fullFat = false;

	$: months = MONTH_NAMES.map((name, index) => {
		const relevantRecords = getMonthsOfRecords(records, index + 1);
		return {
			name,
			index,
			records: relevantRecords,
			hasRecords: !!relevantRecords.length
		};
	});
	$: if (!fullFat) {
		months = months.filter(({hasRecords}) => hasRecords)
	}
</script>

<Accordion>
	{#each months as month}
		{#if month.hasRecords}
			<AccordionItem header={month.name}>
				{#if fullFat}
					<Entry
						records={month.records}
						groupByDay={true}
						viewMoreHeading="View all {month.name} records"
					/>
					<RecordsByDay records={month.records} viewMoreHeading="View all {month.name} records"/>
				{:else}
					<RecordsByDay records={month.records} isCollapsible={false}/>
				{/if}
			</AccordionItem>
		{:else}
			<div class="accordion-item accordion-item--empty">
				<h2 class="accordion-header">
					<span class="accordion-button collapsed"
						>{month.name}&nbsp;-&nbsp;<small>No records</small></span
					>
				</h2>
			</div>
		{/if}
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
