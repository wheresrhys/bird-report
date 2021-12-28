<script>
	/** @typedef {import('../../lib/data-tools').Record} Record */

	import Records from '../aggregates/Records.svelte';
	import { TabPane, Form, FormGroup, Input, Label } from 'sveltestrap';
	import * as JsSearch from 'js-search';

	export let bird;
	export let rawRecords;

	/**
	 * @typedef {Object} IndexableRecord
	 * @implements {Record}
	 */

	$: search = new JsSearch.Search('id');
  $: {
  	/**
  	 * @param {Record} doc
  	 * @param {number} id
  	 * @return {IndexableRecord}
  	 */
  	function addId (doc, id) {
			return {...doc, id}
  	}

  	search.addIndex('notes');
		search.addIndex('location');

		search.addDocuments(rawRecords.map(addId))
  }

	$: results = []

	/**
	 * @param {CustomEvent} ev
	 */
	const runQuery = ev => {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		results = search.search(target.value)
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
	      on:change={runQuery}
	    />
	  </FormGroup>
	  <Records records={results} isCollapsible={false}/>

	</Form>
</TabPane>

