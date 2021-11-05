<script>
  export let numberIndex
  export let viceCounty
  export let location
  export let date
</script>


<div>
        <b>
          {numberIndex}:
        </b>
        <div>
        <b>{viceCounty}</b>
          <div>
            {#if location}
            {location}{/if}
            {date.toDateString()}
          </div>
</div>
</div>

