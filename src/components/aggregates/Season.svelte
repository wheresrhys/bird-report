<script>
	import Entry from './Entry.svelte';
	import { Accordion, AccordionItem } from 'sveltestrap';
	import { getMonthsOfRecords } from '../../lib/data-tools';

	export let rawRecords;
	export let months;
	export let heading;
	export let preStats;
	export let postStats;

	const MONTH_NAMES = [
		null,
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

	const monthsToNames = (months) =>
		`${MONTH_NAMES[months[0]]} to ${MONTH_NAMES[months[months.length - 1]]}`;
</script>

<section>
	<h2>
		{heading}: {monthsToNames(months)}
	</h2>

	<Entry
		heading="Summary"
		rawRecords={getMonthsOfRecords(rawRecords, ...months)}
		{preStats}
		{postStats}
	/>
</section>
