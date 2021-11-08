<script>
	import { TabContent } from 'sveltestrap';
	import WholeYear from './tabs/WholeYear.svelte';
	import { allRecords } from '../lib/stores.js';
	import { clean } from '../lib/data-tools.js';

	/** @type {string} */
	export let bird;
	//     const [distribution, setDistribution] = useLocalStorage(bird, {
	//   winter: -1,
	//   springPassage: -1,
	//   breeding: -1,
	//   autumnPassage: -1
	// })

	$: rawRecords = $allRecords.filter(({ species }) => species === bird);
	$: recordCount = rawRecords.length;
	$: records = clean(rawRecords);
	// const breedingSites = getBreedingSites(records, distribution)

	// const birdData = {records, distribution}
</script>

<h2>{bird} - {recordCount} records</h2>
<div>{bird}</div>
<div>Trends graph</div>
<TabContent>
	<WholeYear {records} />
</TabContent>
<!--     <Trends {...birdData} />

      <Tab eventKey="months" title="Individual months">
        <Months {...birdData} />
        {' '}
      </Tab>
      <Tab eventKey="inner-london" title="Inner London" >
        <Records records={records.filter(({viceCounty}) => viceCounty === 'IL')} initiallyOpen={true} />
      </Tab>
      <Tab eventKey="winter" title="Winter" disabled={!distribution.winter}>
        {distribution.winter ? (
            <FirstWinter {...birdData} />
            <SecondWinter {...birdData} />
) : null}
      </Tab>
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
      <Tab eventKey="settings" title="Settings" >
        <SettingsForm species={bird} distribution={distribution} setDistribution={setDistribution}/>
      </Tab>
    </TabContent>
 -->
