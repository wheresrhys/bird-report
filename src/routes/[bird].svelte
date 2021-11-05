<script context="module">
	import Bird from '../components/Bird.svelte';
	export function load({ page }) {
		return {
			props: {
				bird: /** @type {string} */ (page.params.bird)
			}
		};
	}
</script>

<script>
	export let bird;
</script>

<svelte:head>
	<title>{bird}</title>
</svelte:head>
<Bird {bird} />
