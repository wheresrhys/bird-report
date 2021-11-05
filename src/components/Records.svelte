<script>
  import Record from './Record.svelte';
  export let records
  export let heading

</script>

<h3>{heading}</h3>
<ul>
  {#each records as record}
    <li><Record {...record} />
    </li>{/each}
</ul>
