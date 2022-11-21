<script>
	import Records from './Records.svelte';
	export let numberIndex;
	export let viceCounty;
	export let location;
	export let date;
	export let notes;
	export let observer;
	export let records = [];
	export let aggregationType;
	/** @type {string[]} */
	export let parentAggregationTypes = [];
	export let viewMoreHeading =
		aggregationType === 'same day'
			? 'records >'
			: aggregationType === 'same location'
			? 'multiple records >'
			: undefined;

</script>

<div>
	<b>
		{numberIndex}
	</b>
	{#if location && !parentAggregationTypes.includes('same location')}
		{location} ({viceCounty}){/if}
	{#if !parentAggregationTypes.includes('same day')}on <time
			>{date.toDateString()}</time
		>{/if}
	{#if records && records.length}
		<Records
			{records}
			{viewMoreHeading}
			parentAggregationTypes={[...parentAggregationTypes, aggregationType]}
		/>{:else}
		by {observer}
		{#if notes}<br /><small>{notes}</small>{/if}
	{/if}
</div>

<style>
	time {
		font-style: italic;
	}
</style>
