<script>
	import { run } from 'svelte/legacy';

	import Bird from '../../components/Bird.svelte';
	let { data } = $props();
		let { bird } = $state(data);
		run(() => {
		({ bird } = data);
	}); // so it stays in sync when `data` changes
</script>

<svelte:head>
	<title>{bird}</title>
</svelte:head>
<Bird {bird} />
