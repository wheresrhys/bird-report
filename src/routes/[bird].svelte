<script context="module">
	import Bird from '../components/Bird.svelte';
	/**
	 * @param {Object} context
	 * @param {Object} context.page
	 * @param {Object} context.page.params
	 * @param {string} context.page.params.bird
	 * @returns {{props: {bird: string}}}
	 */
	export function load({ page }) {
		return {
			props: {
				bird: page.params.bird,
				initialCounty: 'ALL'
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
