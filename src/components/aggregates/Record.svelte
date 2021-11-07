<script>
	// import Records from './Records.svelte';
	export let numberIndex;
	export let viceCounty;
	export let location;
	export let date;
	// export let records = [];
	// export let viewMoreHeading;
</script>

<div>
	<b>
		{numberIndex}:
	</b>
	<div>
		<div>
			{#if location}
				{location}, {viceCounty}{/if}
			{date.toDateString()}
		</div>
	</div>
	<!-- 	{#if records.length}
		 <Records records={records} viewMoreHeading={viewMoreHeading} />
	{/if} -->
</div>
