<script context="module">

  export function load({ page }) {
    return {
      props: {
        bird: page.params.bird
      }
    }
  }

  // import { page } from '$app/stores';
  // console.log(page)
  // export let bird = page.bird;
</script>
<script>
  export let bird
</script>
<svelte:head>
	<title>{bird}</title>
</svelte:head>



<h1>{bird}</h1>
<!--     <Trends {...birdData} />
    <Tabs defaultActiveKey="whole-year" id="uncontrolled-tab-example">
      <Tab eventKey="whole-year" title="Whole year" >
        <Entry records={records} initiallyOpen={true} />
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
