<script>
	/** @typedef {import('../../lib/data-tools').Record} Record */

	import Records from '../aggregates/Records.svelte';
	import { TabPane, Form, FormGroup, Input, Label } from 'sveltestrap';
	import elasticlunr from 'elasticlunr'


	export let bird;
	export let rawRecords;
	$: index = elasticlunr()
  $: {
  	/**
  	 * @param {Record} doc
  	 * @param {number} id
  	 */
  	function indexRecord (doc, id) {
			index.addDoc({...doc, id})
  	}
		index.addField('notes');
	  index.addField('location');
	  index.setRef('id');

		rawRecords.forEach(indexRecord)
  }

	$: results = []

	/**
	 * @param {CustomEvent} ev
	 */
	const search = ev => {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		const searchResults = index.search(target.value).map(({ref}) => Number(ref))
		results = (searchResults.map(/** @type {(i: number) => Record} */(i => rawRecords[i])))
	}


</script>

<TabPane tabId="search" tab="Search">
	<Form>
		<h2>Search {bird} records</h2>

	 	<FormGroup>
	    <Label for="search">Search</Label>
	    <Input
	      type="search"
	      name="search"
	      id="search"
	      placeholder="Search for whole words"
	      on:change={search}
	    />
	  </FormGroup>
	  <Records records={results} isCollapsible={false}/>

	</Form>
</TabPane>
