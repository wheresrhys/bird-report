<script>
	import Record from './Record.svelte';
	import { Collapse } from 'sveltestrap';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records;
	export let isOpen = false;
	/** @type {string} */
	export let viewMoreHeading = 'View detail';
	/** @type {string[]} */
	export let parentAggregationTypes = [];
</script>

<button on:click={() => (isOpen = !isOpen)} class="link">
	{viewMoreHeading}
</button>
<Collapse {isOpen}>
	<ul>
		{#each records as record}
			<li><Record {...record} {parentAggregationTypes} /></li>{/each}
	</ul>
</Collapse>

<!--


export function DailyRecords ({initiallyOpen = false,heading, records}) {
  const [open, setOpen] = useState(initiallyOpen)
  const days = group(records, ({date}) => date.getDate())
    .sort((rs1, rs2) => {
      return rs1[0].date > rs2[0].date ? 1 : rs1[0].date < rs2[0].date ? -1 : 0;
    })

  return  (
      <>
        {initiallyOpen === false ? <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          {heading}
        </Button> : null}
        {open ? (
          <Collapse in={open}>
            <Table>
              <tbody>
              {days.map(records =>
                <TableRow
                  heading={records[0].date.getDate()}
                  content={<ul>

              {records.map(props => <li><Record {...props} /></li>)}
            </ul>}
                />)}
              </tbody>
            </Table>


          </Collapse>
  )  : null}
      </>
    )
} -->
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
