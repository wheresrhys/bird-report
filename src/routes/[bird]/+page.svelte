<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import Bird from '../../components/Bird.svelte';

	// /**
	//  * @param {Object} context
	//  * @param {Object} context.page
	//  * @param {Object} context.page.params
	//  * @param {string} context.page.params.bird
	//  * @returns {{props: {bird: string}}}
	//  */
	// export function load({ page }) {
	// 	return {
	// 		props: {
	// 			bird: page.params.bird
	// 		}
	// 	};
	// }
</script>

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	export let bird;
</script>

<svelte:head>
	<title>{bird}</title>
</svelte:head>
<Bird {bird} />
