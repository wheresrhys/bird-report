<script>
	import { TabPane } from 'sveltestrap';
	import { getSettingsStore } from '../../lib/settings';
	import { Form, FormGroup, Input, Label } from 'sveltestrap';

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

	/**
	 * @param {CustomEvent} ev
	 */
	function updateSettings(ev) {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		$settings = { ...$settings, [target.id]: Number(target.value) };
	}

	$: settings = getSettingsStore(bird);
</script>

<TabPane tabId="settings" tab="Settings">
	<Form>
		<h2>{bird}</h2>

		{#each fields as field}
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
</TabPane>
