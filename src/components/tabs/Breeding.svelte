<script>
	import { TabPane, Accordion, AccordionItem } from 'sveltestrap';
	import Records from '../aggregates/Records.svelte';
	import { BREEDING } from '../../lib/constants';
	/** @typedef {import('../../lib/data-tools').Site} Site */
	/** @typedef {import('../../lib/settings').Settings} Settings */

	/** @type {Settings} */
	export let settings;
	/** @type {Site[]} */
	export let breedingData
</script>

<TabPane tabId="breeding" tab="Breeding" disabled={settings[BREEDING] < 1}>
	{#if settings[BREEDING] >= 1}
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
	{:else}
		Not a breeding bird
	{/if}
</TabPane>
