<script>
	import {
		Nav,
		NavItem,
		NavLink,
		Form,
		FormGroup,
		Input,
		Container,
		Row
	} from 'sveltestrap';
	import { loadRecords } from '../lib/data-loader';
	import { speciesList, allRecords } from '../lib/stores.js';
	import { Styles } from 'sveltestrap';
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
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			const records = loadRecords(
				new Uint8Array(/** @type {ArrayBuffer} */ (reader.result))
			);

			$speciesList = getSpeciesList(records);
			$allRecords = records;
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
		<h1>London bird report helper</h1>
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
		<Nav>
			{#each $speciesList as species}
				<NavItem><NavLink href={`/${species}`}>{species}</NavLink></NavItem>
			{/each}
		</Nav>
	</Row><Row>
		<slot />
	</Row>
</Container>
<Styles />
