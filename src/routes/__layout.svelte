<script>
	import {
		Nav,
		NavItem,
		NavLink,
		Form,
		FormGroup,
		Input,
		Container,
		Row,
		Spinner
	} from 'sveltestrap';
	import { loadRecords } from '../lib/data-loader';
	import { speciesList, allRecords, year } from '../lib/stores.js';
	import { Styles } from 'sveltestrap';
	let showSpinner = false;
	/**
	 * @param {import('../lib/data-loader').BirdRecord[]} records
	 * @returns {string[]}
	 */
	const getSpeciesList = (records) => [
		...records.reduce((set, { species }) => set.add(species), new Set())
	];

	/**
	 * @param {CustomEvent} ev
	 */
	const handleFileLoad = (ev) => {
		showSpinner = true;
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			const records = loadRecords(
				new Uint8Array(/** @type {ArrayBuffer} */ (reader.result))
			);

			$speciesList = getSpeciesList(records);
			$allRecords = records;
			$year = records[0].date.getFullYear();
			showSpinner = false;
		});
		reader.readAsArrayBuffer(
			/** @type {HTMLInputElement} */ (ev.currentTarget).files[0]
		);
	};
</script>

<svelte:head>
	<title>London Bird Report</title>
</svelte:head>
<Container>
	<Row>
		<h1>
			London bird report helper{#if $year}{$year}{/if}
		</h1>
		<Form
			><FormGroup>
				<Input
					type="file"
					id="custom-file"
					label="Load spreadsheet"
					on:change={handleFileLoad}
				/></FormGroup
			>
		</Form>
	</Row>
	<Row>
		{#if showSpinner}
			<div class="spinner">
				<Spinner color="primary" />
			</div>
		{/if}
		<Nav>
			{#each $speciesList as species}
				<NavItem><NavLink href={`/${species}`}>{species}</NavLink></NavItem>
			{/each}
		</Nav>
	</Row><Row>
		{#if $speciesList.length}
			<slot />
		{/if}
	</Row>
</Container>
<Styles />

<style>
	.spinner {
		display: flex;
		justify-content: center;
	}
</style>
