<script>
	import { TabPane } from 'sveltestrap';
	import Season from '../aggregates/Season.svelte';
	import { WINTER, BREEDING } from '../../lib/constants';
	/** @typedef {import('../../lib/data-tools').Record} Record*/
	/** @typedef {import('../../lib/settings').Settings} Settings*/

	/** @type {Record[]} */
	export let records;
	/** @type {Settings} */
	export let settings;

	// If it's springPassage not autumnPassage widespread breeder then we assume
	// winter stretches into March
	$: firstWinterMonths = settings[BREEDING] < 3 ? [1, 2, 3] : [1, 2];
</script>

<TabPane tabId="winter" tab="Winter" disabled={settings[WINTER] < 1}>
	{#if settings[WINTER] >= 1}
		<Season heading="First winter" months={firstWinterMonths} {records} />
		<Season heading="Second winter" months={[11, 12]} {records} />
	{:else}
		Not a winter visitor
	{/if}
</TabPane>
