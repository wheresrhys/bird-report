<script>
	import Record from './Record.svelte';
	import { group } from '../../lib/data-tools';
	import { Collapse, Table } from 'sveltestrap';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;
	export let isOpen = false;
	/** @type {string} */
	export let viewMoreHeading = 'View detail';
	/** @type {string[]} */
	$: days = group(records, ({ date }) => date.getDate()).sort((rs1, rs2) => {
		return rs1[0].date > rs2[0].date ? 1 : rs1[0].date < rs2[0].date ? -1 : 0;
	});
</script>

<button on:click={() => (isOpen = !isOpen)} class="link">
	{viewMoreHeading}
</button>
<Collapse {isOpen}>
<Table>
	<tbody>
		{#each days as records}
			<tr
				><th>{records[0].date.getDate()}</th>
				<td
					><ul>
						{#each records as record}<li><Record {...record} parentAggregationTypes={['same day']}/></li>{/each}
					</ul></td
				></tr
			>
		{/each}
	</tbody>
</Table>
</Collapse>

<style>
	.link {
		outline: none;
		border: none;
		padding: none;
		text-decoration: underline;
		color: blue;
		background: none;
	}
</style>
