<script>
	import { county } from '../../lib/stores';
	import { Form, FormGroup, Input, Label } from 'sveltestrap';

	import {
		COUNTIES
	} from '../../lib/constants';


	/**
	 * @param {CustomEvent} ev
	 */
	function updateCounty(ev) {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		$county = target.value
	}

</script>

<Form class="county-selector">
	<FormGroup>
		<Input
			type="select"
			name="county-selector"
			id="county-selector"
			value={$county}
			on:change={updateCounty}
		>
			{#each Object.entries(COUNTIES) as [key, value]}
				<option value={key}>{value}</option>
			{/each}
		</Input>
	</FormGroup>
</Form>

<style>
	:global(.county-selector) {
		display: inline-block;
		margin-left: 20px;
	}
</style>
