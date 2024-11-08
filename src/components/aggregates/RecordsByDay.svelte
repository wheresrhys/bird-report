<script>
	import Record from './Record.svelte';
	import { group } from '../../lib/data-tools';
	import { Collapse, Table } from '@sveltestrap/sveltestrap';
	import moment from 'moment';
	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @type {Record[]} */
	export let records;
	export let isCollapsible = true;
	export let isOpen = !isCollapsible;
	export let dateFormat = 'day'
	/** @type {string} */
	export let viewMoreHeading = 'View detail';

	/** @type {Record[][]} */
	$: days = group(records, ({ date }) => moment(date).format('DD/MM'))
	// .sort((rs1, rs2) => {
	// 	return rs1[0].date > rs2[0].date ? 1 : rs1[0].date < rs2[0].date ? -1 : 0;
	// });

</script>
{#if isCollapsible}
<button on:click={() => (isOpen = !isOpen)} class="link">
	{viewMoreHeading}
</button>
{/if}
<Collapse {isOpen}>
	<Table>
		<tbody>
			{#each days as records}
				<tr
					><th>{dateFormat === 'day' ? records[0].date.getDate() : records[0].date.toLocaleDateString().split(',')[0]}</th>
					<td
						><ul>
							{#each records as record}<li>
									<Record {...record} parentAggregationTypes={['same day']} />
								</li>{/each}
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
