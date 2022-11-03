/**
 * @param {Object} context
 * @param {Object} context.params
 * @param {string} context.params.bird
 * @returns {{props: {bird: string}}}
 */
export function load({ params }) {
	return {
		bird: params.bird
	};
}
