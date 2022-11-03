<script>
	/** @typedef {import('../../lib/data-tools').Record} Record */

	import Records from '../aggregates/Records.svelte';
	import { beforeUpdate } from 'svelte';
	import { TabPane, Form, FormGroup, Input, Label } from 'sveltestrap';
	import * as JsSearch from 'js-search';

	export let bird;
	export let rawRecords;

	/**
	 * @typedef {Object} IndexableRecord
	 * @implements {Record}
	 * @property {number} id
	 */

	/**
	 * @param {Record} doc
	 * @param {number} id
	 * @return {IndexableRecord}
	 */
	function addId(doc, id) {
		return { ...doc, id };
	}

	let search;
	let searchQuery;

	$: results = [];

	$: {
		search = new JsSearch.Search('id');

		search.addIndex('notes');
		search.addIndex('location');
		search.addIndex('observer');

		search.addDocuments(rawRecords.map(addId));
	}

	beforeUpdate(() => {
		if (searchQuery) {
			results = search.search(searchQuery);
		}
	});

	/**
	 * @param {KeyboardEvent} ev
	 */
	const runQuery = (ev) => {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		results = search.search(target.value);
	};
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
				on:keyup={runQuery}
				bind:value={searchQuery}
			/>
		</FormGroup>
		<Records records={results} isCollapsible={false} />
	</Form>
</TabPane>
