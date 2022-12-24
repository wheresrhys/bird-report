<script>
	import { Accordion, AccordionItem } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	import ContentOrSettings from '../UI/ContentOrSettings.svelte';
	import Heatmap from '../UI/Heatmap.svelte';
	import { BREEDING } from '../../lib/constants';
	import { getMonthsOfRecords } from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Site} Site */
	/** @typedef {import('../../lib/bird-settings').Settings} Settings */

	/** @type {Settings} */
	export let settings;
	/** @type {Site[]} */
	export let breedingData;
	export let breedingSites;
	export let bird;
	export let records;
	// $: otherRecords = settings.breeding < 3 ? [] : getMonthsOfRecords(records.filter(({location}) => !breedingSites.includes(location)), 4, 5, 6, 7);
</script>

<ContentOrSettings {settings} {bird} season={BREEDING}>
	<h3>Breeding (Experimental)</h3>
	<p>Sites with repeated records in May or June are grouped for ease of assessing breeding status. For birds that are widespread breeders this grouping is unlikely to be particularly useful. Even for localised breeders it's best to also check the records for the spring and summer months.</p>

	<Accordion>
		{#each breedingData as site}
			<AccordionItem>
				<div slot="header">
					{site.location} ({site.viceCounty})
					<!-- {#if settings.breeding !== 4} -->
					<Heatmap records={site.records} />
					<!-- {/if} -->
			</div>
			<!-- {#if settings.breeding === 4}<Heatmap records={site.records} />{/if} -->
				<Records
					records={site.records}
					isCollapsible={false}
					parentAggregationTypes={['same location']}
				/>
			</AccordionItem>
		{/each}
		<!-- <AccordionItem header="Miscellaneous sightings in season">
				<Records
					records={otherRecords}
					isCollapsible={false}
				/>
			</AccordionItem> -->
	</Accordion>
</ContentOrSettings>
