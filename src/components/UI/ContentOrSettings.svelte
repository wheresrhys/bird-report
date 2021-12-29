<script>
	import { TabPane } from 'sveltestrap';
	import SettingsForm from './SettingsForm.svelte';
	export let season;
	export let bird;
	export let settings;

	const humanReadable = (season) =>
		season.replace(
			/([a-z])([A-Z])/g,
			($0, $1, $2) => `${$1} ${$2.toLowerCase()}`
		);

	const capitalise = (str) => str.charAt(0).toUpperCase() + str.substr(1);

	const grammaticalSeason = (season) =>
		`${
			'aeiou'.split('').includes(season.charAt(0)) ? 'an' : 'a'
		} ${humanReadable(season)}`;
</script>

<TabPane tabId={season} tab={capitalise(humanReadable(season))}>
	{#if settings[season] === -1}
		<h3>Please set {bird}'s seasonal distribution to aid analysis</h3>
		<p>(You can change at any time by going to the 'settings' tab)</p>
		<SettingsForm {bird} {season} />
	{:else if settings[season]}
		<slot />
	{:else}
		<h3>
			{bird} is not {grammaticalSeason(season)} bird in the London recording area.
		</h3>
	{/if}
</TabPane>
