<script>
	import { getSettingsStore } from '../../lib/bird-settings';
	import { Form, FormGroup, Input, Label } from '@sveltestrap/sveltestrap';

	import {
		WINTER,
		SPRING,
		BREEDING,
		AUTUMN,
		UNKNOWN,
		VAGRANT,
		HIGHLY_LOCALISED,
		LOCALISED,
		WIDESPREAD
	} from '../../lib/constants';

	const fields = [
		{
			id: WINTER,
			label: 'Winter'
		},
		{
			id: SPRING,
			label: 'Spring passage'
		},
		{
			id: BREEDING,
			label: 'Breeding'
		},
		{
			id: AUTUMN,
			label: 'Autumn passage'
		}
	];

	export let bird;
	export let season;
	/**
	 * @param {CustomEvent} ev
	 */
	function updateSettings(ev) {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		$settings = { ...$settings, [target.id]: Number(target.value) };
	}

	$: settings = getSettingsStore(bird);

	$: fieldsToOutput = season
		? fields.filter(({ id }) => id === season)
		: fields;
</script>

<Form>
	{#each fieldsToOutput as field}
		<FormGroup>
			<Label for={field.id}>{field.label}</Label>
			<Input
				type="select"
				name={field.id}
				id={field.id}
				value={$settings[field.id]}
				on:change={updateSettings}
			>
				<option value={-1}>Please select</option>
				<option value={UNKNOWN}>UNKNOWN</option>
				<option value={VAGRANT}>VAGRANT</option>
				<option value={HIGHLY_LOCALISED}>HIGHLY_LOCALISED</option>
				<option value={LOCALISED}>LOCALISED</option>
				<option value={WIDESPREAD}>WIDESPREAD</option>
			</Input>
		</FormGroup>
	{/each}
</Form>
