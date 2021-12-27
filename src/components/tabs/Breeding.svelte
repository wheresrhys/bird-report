<script>
	import { TabPane, Accordion, AccordionItem } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	import { BREEDING } from '../../lib/constants';
	import { clean, getBreedingSites } from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;
	export let settings;

	$: breedingSites = getBreedingSites(clean(rawRecords), settings);
</script>

<TabPane tabId="breeding" tab="Breeding" disabled={settings[BREEDING] < 1}>
	{#if settings[BREEDING] >= 1}
		<Accordion>
			{#each breedingSites as site}
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
	{:else}
		Not a breeding bird
	{/if}
</TabPane>
