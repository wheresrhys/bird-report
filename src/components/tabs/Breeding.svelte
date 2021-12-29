<script>
	import { Accordion, AccordionItem } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	import ContentOrSettings from '../UI/ContentOrSettings.svelte';
	import { BREEDING } from '../../lib/constants';
	/** @typedef {import('../../lib/data-tools').Site} Site */
	/** @typedef {import('../../lib/settings').Settings} Settings */

	/** @type {Settings} */
	export let settings;
	/** @type {Site[]} */
	export let breedingData;
	export let bird;
</script>

<ContentOrSettings {settings} {bird} season={BREEDING}>
	<Accordion>
		{#each breedingData as site}
			<AccordionItem header={site.location}>
				<Records
					records={site.records}
					isOpen={true}
					isCollapsible={false}
					parentAggregationTypes={['same location']}
				/>
			</AccordionItem>
		{/each}
	</Accordion>
</ContentOrSettings>
