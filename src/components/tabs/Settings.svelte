<script>
	import { TabPane } from 'sveltestrap';
	import { getSettingsStore } from '../../lib/settings';
	import SettingsForm from '../UI/SettingsForm.svelte';

	export let bird;
</script>

<TabPane tabId="settings" tab="Settings">
	<SettingsForm {bird} />
</TabPane>
