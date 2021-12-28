<script>
	import { TabContent } from 'sveltestrap';
	import TrendChart from './UI/TrendChart.svelte';
	import WholeYear from './tabs/WholeYear.svelte';
	import Months from './tabs/Months.svelte';
	import InnerLondon from './tabs/InnerLondon.svelte';
	import Winter from './tabs/Winter.svelte';
	import Spring from './tabs/Spring.svelte';
	import Breeding from './tabs/Breeding.svelte';
	import Autumn from './tabs/Autumn.svelte';
	import Settings from './tabs/Settings.svelte';
	import { allRecords } from '../lib/stores.js';
	import { getSettingsStore } from '../lib/settings';
	import { clean , getBreedingSites} from '../lib/data-tools';
	/** @type {string} */
	export let bird;

	$: settings = getSettingsStore(bird);

	$: rawRecords = $allRecords.filter(({ species }) => species === bird);

	$: records = clean(rawRecords);

	$: breedingData = getBreedingSites(records, settings)

	$: breedingSites = breedingData.map(
		({ location }) => location
	);
</script>

<h2>{bird}</h2>
<div>{bird}</div>
<TrendChart {rawRecords} />
<TabContent>
	<WholeYear {records} />
	<Months {records} />
	<InnerLondon {records} />
	<Winter {records} settings={$settings} />
	<Spring {records} settings={$settings} {breedingSites} />
	<Breeding settings={$settings} {breedingData} />
	<Autumn {records} settings={$settings} {breedingSites} />
	<Settings {bird} />
	<!--



      <Tab eventKey="breeding" title="Breeding" disabled={!distribution.breeding}>
        {distribution.breeding ? <Breeding {...birdData} breedingSites={breedingSites}/> : null}
      </Tab>
      <Tab eventKey="autumn" title="Autumn passage" disabled={!distribution.autumnPassage}>
        {distribution.autumnPassage ? <Autumn {...birdData} breedingSites={breedingSites} /> : null}
      </Tab>
      <Tab eventKey="search" title="Search" >
        <Search records={rawRecords}/>
      </Tab>

    </TabContent>
 -->
</TabContent>
