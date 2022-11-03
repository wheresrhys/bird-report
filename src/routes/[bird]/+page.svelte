<script>
	import Bird from '../../components/Bird.svelte';
		export let data;
		let { bird } = data;
		$: ({ bird } = data); // so it stays in sync when `data` changes
</script>

<svelte:head>
	<title>{bird}</title>
</svelte:head>
<Bird {bird} />
