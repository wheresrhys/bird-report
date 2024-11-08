<script>
	import { TabContent, TabPane } from '@sveltestrap/sveltestrap';
	import Season from '../aggregates/Season.svelte';
	import { WINTER, BREEDING } from '../../lib/constants';
	import ContentOrSettings from '../UI/ContentOrSettings.svelte';
	/** @typedef {import('../../lib/data-tools').Record} Record*/
	/** @typedef {import('../../lib/bird-settings').Settings} Settings*/

	/** @type {Record[]} */
	export let records;
	/** @type {Settings} */
	export let settings;
	export let bird;

	// If it's springPassage not autumnPassage widespread breeder then we assume
	// winter stretches into March
	$: firstWinterMonths = settings[BREEDING] < 3 ? [1, 2, 3] : [1, 2];
</script>

<ContentOrSettings {settings} {bird} season={WINTER}>
	<TabContent>
		<TabPane tabId="first-winter" tab="First winter" active>
	<Season heading="First winter" months={firstWinterMonths} {records} isWidespread={settings.winter === 4}/>
</TabPane>
	<TabPane tabId="second-winter" tab="Second winter">
	<Season heading="Second winter" months={[11, 12]} {records} isWidespread={settings.winter === 4}/>
	</TabPane>
	</TabContent>
</ContentOrSettings>
