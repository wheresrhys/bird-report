<script>
	import { TabPane, Accordion, AccordionItem } from 'sveltestrap';
	import Entry from '../aggregates/Entry.svelte';
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
	export let rawRecords = [];

	$: months = MONTH_NAMES.map((name, index) => {
		const records = getMonthsOfRecords(rawRecords, index + 1);
		return {
			name,
			index,
			rawRecords: records,
			hasRecords: !!records.length
		};
	});
	$: console.log(months);
</script>

<TabPane tabId="months" tab="Individual months">
	<section>
		<Accordion>
			{#each months as month, index}
				{#if month.hasRecords}
					<AccordionItem header={month.name}>
						<Entry
							rawRecords={month.rawRecords}
							groupByDay={true}
							viewMoreHeading="View all {month.name} records"
						/>
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
			{/each}}
		</Accordion>
	</section>
</TabPane>

<style>
	.accordion-item--empty {
		opacity: 0.5;
	}
	.accordion-item--empty .accordion-header .accordion-button::after {
		display: none;
	}
</style>
