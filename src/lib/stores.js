import { writable } from 'svelte/store';
import { COUNTIES } from './constants';
export const speciesList = writable([]);
export const allRecords = writable([]);
export const year = writable();
export const county = writable('ALL');
