<script>
	import { threshold } from '../../lib/stores';
	import { Form, FormGroup, Input } from 'sveltestrap';

	$threshold = null;

	/**
	 * @param {CustomEvent} ev
	 */
	function updateThreshold(ev) {
		const target = /** @type {HTMLInputElement} */ (ev.target);
		$threshold = target.value
	}

</script>

<Form class="threshold-selector">
	<FormGroup>
		<Input
			type="number"
			name="threshold-selector"
			id="threshold-selector"
			value={$threshold}
			placeholder="Only show records greater than..."
			on:change={updateThreshold}
		>
		</Input>
		{#if $threshold}
		<span class="threshold-warning">
			Warning! - not showing all records
		</span>
		{/if}
	</FormGroup>

</Form>

<style>
	:global(.threshold-selector) {
		display: inline-block;
		margin-left: 20px;
	}

	:global(.threshold-selector .form-select) {
		display: inline-block;
		width:  auto;
	}

	:global(.threshold-warning) {
		display: inline;
		margin-left: 10px;
		color:  red;
		font-weight:  bold;
	}
</style>
