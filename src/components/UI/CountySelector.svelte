<script>
	import { county } from '../../lib/stores';
	import { Form, FormGroup, Input } from 'sveltestrap';

	import {
		COUNTIES
	} from '../../lib/constants';

	$county = 'ALL';

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
		{#if $county !== 'ALL'}
		<span class="county-warning">
			Warning! - not showing all records
		</span>
		{/if}
	</FormGroup>

</Form>

<style>
	:global(.county-selector) {
		display: inline-block;
		margin-left: 20px;
	}

	:global(.county-selector .form-select) {
		display: inline-block;
		width:  auto;
	}

	:global(.county-warning) {
		display: inline;
		margin-left: 10px;
		color:  red;
		font-weight:  bold;
	}
</style>
