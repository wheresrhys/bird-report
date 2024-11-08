<script>
	import { TabContent } from '@sveltestrap/sveltestrap';
	import TrendChart from './UI/TrendChart.svelte';
	import WholeYear from './tabs/WholeYear.svelte';
	import Months from './tabs/Months.svelte';
	import Winter from './tabs/Winter.svelte';
	import Spring from './tabs/Spring.svelte';
	import Breeding from './tabs/Breeding.svelte';
	import Autumn from './tabs/Autumn.svelte';
	import Search from './tabs/Search.svelte';
	import Settings from './tabs/Settings.svelte';
	import TextBlocks from './tabs/TextBlocks.svelte';
	import { allRecords, county, threshold } from '../lib/stores.js';
	import { getSettingsStore } from '../lib/bird-settings';
	import { COUNTIES } from '../lib/constants';
	import { clean, getBreedingSites } from '../lib/data-tools';
	import CountySelector from './UI/CountySelector.svelte';
	import ThresholdSelector from './UI/ThresholdSelector.svelte';
	/** @type {string} */
	export let bird;

	$: settings = getSettingsStore(bird);
	$: rawRecords = $allRecords
		.filter(({ species, viceCounty, numberIndex, location }) => {
			if (species !== bird) return false
			if ($threshold && numberIndex < $threshold) return false;
			if ($county === 'ALL') return true
			return viceCounty === $county
			// return viceCounty = "KT"
		})
	$: records = clean(rawRecords);

	$: breedingData = getBreedingSites(records, $settings);


	$: breedingSites = breedingData.map(({ location }) => location);
</script>

<h2>{bird} <CountySelector /><ThresholdSelector /></h2>

<TrendChart {rawRecords} />
<TabContent>
	<WholeYear {records} />
	<Months {records} />
	<Winter {records} settings={$settings} {bird} />
	<Spring {records} settings={$settings} {breedingSites} {bird} />
	<Breeding settings={$settings} {breedingData} {breedingSites} {bird} {records} />
	<Autumn {records} settings={$settings} {breedingSites} {bird} />
	<Search {bird} {rawRecords} />
	<Settings {bird} />
	<TextBlocks {records} />
</TabContent>
