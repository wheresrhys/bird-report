<script>
	import { TabPane, Accordion, AccordionItem } from 'sveltestrap';
  import Season from '../aggregates/Season.svelte'
  import Records from '../aggregates/Records.svelte';
  import { BREEDING} from '../../lib/constants'
  import { getMonthsOfRecords, group, clean } from '../../lib/data-tools';
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;
  export let settings;


  const getBreedingSites = (records, settings) => {
    if (settings.breeding<1) {
      return [];
    }

    const breedingMonths = [5, 6]
    records = getMonthsOfRecords(records, ...breedingMonths)

    return group(records, ({location}) => location)
      .map(records => records.length > 2 ? {
        records,
        location: records[0].location
      } : null)
      .filter(records => !!records)
  }


  $: breedingSites = getBreedingSites(clean(rawRecords), settings)


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
