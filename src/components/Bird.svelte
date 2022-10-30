<script>
	import { TabContent } from 'sveltestrap';
	import TrendChart from './UI/TrendChart.svelte';
	import WholeYear from './tabs/WholeYear.svelte';
	import Months from './tabs/Months.svelte';
	import Winter from './tabs/Winter.svelte';
	import Spring from './tabs/Spring.svelte';
	import Breeding from './tabs/Breeding.svelte';
	import Autumn from './tabs/Autumn.svelte';
	import Search from './tabs/Search.svelte';
	import Settings from './tabs/Settings.svelte';
	import { allRecords, county } from '../lib/stores.js';
	import { getSettingsStore } from '../lib/bird-settings';
	import { COUNTIES } from '../lib/constants';
	import { clean, getBreedingSites } from '../lib/data-tools';
	import CountySelector from './UI/CountySelector.svelte';
	/** @type {string} */
	export let bird;


	$: settings = getSettingsStore(bird);

	$: rawRecords = $allRecords
		.filter(({ species, viceCounty }) => {
			if (species !== bird) return false
			if ($county === 'ALL') return true
			return viceCounty === $county
		})

	$: records = clean(rawRecords);

	$: breedingData = getBreedingSites(records, settings);

	$: breedingSites = breedingData.map(({ location }) => location);
</script>

<h2>{bird} <CountySelector /></h2>

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
	<!--



        <Search records={rawRecords}/>
 -->
</TabContent>
