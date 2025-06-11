<script>
	import Records from './Records.svelte';
	
	/**
	 * @typedef {Object} Props
	 * @property {any} numberIndex
	 * @property {any} viceCounty
	 * @property {any} location
	 * @property {any} date
	 * @property {any} notes
	 * @property {any} observer
	 * @property {any} [records]
	 * @property {any} aggregationType
	 * @property {string[]} [parentAggregationTypes]
	 * @property {any} [viewMoreHeading]
	 */

	/** @type {Props} */
	let {
		numberIndex,
		viceCounty,
		location,
		date,
		notes,
		observer,
		records = [],
		aggregationType,
		parentAggregationTypes = [],
		viewMoreHeading = aggregationType === 'same day'
			? 'records >'
			: aggregationType === 'same location'
			? 'multiple records >'
			: undefined
	} = $props();

</script>

<div>
	<b>
		{numberIndex}
	</b>
	{#if location && !parentAggregationTypes.includes('same location')}
		{location} ({viceCounty}){/if}
	{#if !parentAggregationTypes.includes('same day')}on <time
			>{date.toLocaleDateString()}</time
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
