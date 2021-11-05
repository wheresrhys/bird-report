<script>
	import { allRecords } from '../lib/stores.js';
	import { clean } from '../lib/data-tools.js';
  import Entry from './Entry.svelte'

	export let bird;
	//     const [distribution, setDistribution] = useLocalStorage(bird, {
	//   winter: -1,
	//   springPassage: -1,
	//   breeding: -1,
	//   autumnPassage: -1
	// })

	let records;
	$: records = clean($allRecords.filter(({ species }) => species === bird));

	// const breedingSites = getBreedingSites(records, distribution)

	// const birdData = {records, distribution}
</script>

<div>{bird} {records.length}</div>

<Entry records={records}/>
<!--     <Trends {...birdData} />
    <Tabs defaultActiveKey="whole-year" id="uncontrolled-tab-example">
      <Tab eventKey="whole-year" title="Whole year" >

      </Tab>
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
    </Tabs>
 -->
