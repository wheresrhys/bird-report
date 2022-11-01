import Bird from '../../components/Bird.svelte';

/**
 * @param {Object} context
 * @param {Object} context.page
 * @param {Object} context.page.params
 * @param {string} context.page.params.bird
 * @returns {{props: {bird: string}}}
 */
export function load({ page }) {
	return {
		bird: page.params.bird
	};
}
