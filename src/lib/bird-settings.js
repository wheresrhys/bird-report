import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { WINTER, SPRING, BREEDING, AUTUMN } from './constants';

const stores = {};

/**
 * @typedef {Object} Settings
 * @property {number} winter
 * @property {number} springPassage
 * @property {number} breeding
 * @property {number} autumnPassage
 */

/** @type {Settings} */
const defaultSettings = {
	[WINTER]: -1,
	[SPRING]: -1,
	[BREEDING]: -1,
	[AUTUMN]: -1
};

/**
 * @param {string} bird
 */
function createStore(bird) {
	const storedSettings = browser && localStorage.getItem(bird);

	const settings = writable(
		storedSettings ? JSON.parse(storedSettings) : defaultSettings
	);

	settings.subscribe((value) =>
		localStorage.setItem(bird, JSON.stringify(value))
	);

	stores[bird] = settings;

	return settings;
}

/**
 * @param {string} bird
 */
export function getSettingsStore(bird) {
	return stores[bird] || createStore(bird);
}
