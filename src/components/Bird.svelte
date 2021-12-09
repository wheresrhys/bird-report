<script>
	import { TabContent } from 'sveltestrap';
	import TrendChart from './UI/TrendChart.svelte';
	import WholeYear from './tabs/WholeYear.svelte';
	import Months from './tabs/Months.svelte';
	import InnerLondon from './tabs/InnerLondon.svelte';
	import Winter from './tabs/Winter.svelte';
	import Settings from './tabs/Settings.svelte';
	import { allRecords } from '../lib/stores.js';

	/** @type {string} */
	export let bird;
	//     const [distribution, setDistribution] = useLocalStorage(bird, {
	//   winter: -1,
	//   springPassage: -1,
	//   breeding: -1,
	//   autumnPassage: -1
	// })

	$: rawRecords = $allRecords.filter(({ species }) => species === bird);

	// const breedingSites = getBreedingSites(records, distribution)

	// const birdData = {records, distribution}
</script>

<h2>{bird}</h2>
<div>{bird}</div>
<TrendChart {rawRecords} />
<TabContent>
	<WholeYear {rawRecords} />
	<Months {rawRecords} />
	<InnerLondon {rawRecords} />
	<Winter {rawRecords} />
	<Settings {bird} />
	<!--


      <Tab eventKey="spring" title="Spring passage" disabled={!distribution.springPassage}>
        {distribution.springPassage ? <Spring {...birdData} breedingSites={breedingSites} /> : null}
      </Tab>
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
