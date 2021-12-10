<script>
	import { TabPane } from 'sveltestrap';
  import Season from '../aggregates/Season.svelte'
	/** @typedef {import('../../lib/data-tools').Record} Record*/

	/** @type {Record[]} */
	export let rawRecords;
  export let settings;


  // If it's springPassage not autumnPassage widespread breeder then we assume winter stretches into March
  $: firstWinterMonths = settings.breeding < 3 ? [1, 2, 3] : [1, 2]


</script>

<TabPane tabId="winter" tab="Winter" disabled={settings.winter < 1}>
  {#if settings.winter >= 1}
    <Season heading="First winter" months={firstWinterMonths} {rawRecords} />
    <Season heading="Second winter" months={[11, 12]} {rawRecords} />
  {:else}
    Not a winter visitor
  {/if}
</TabPane>
