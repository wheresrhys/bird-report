import {group, sortPropAsc} from './data-tools'

/** @typedef {import('./data-tools').Record} Record*/
/** @typedef {import('./data-tools').Stat} Stat*/


const memoizedEarliestFirst = sortPropAsc('date');

/**
 * @param {Record} a
 * @param {Record} b
 * @returns {number}
 */
const earliestFirst = (a, b) => memoizedEarliestFirst(a, b);

/**
 * @param {Record} a
 * @param {Record} b
 * @returns {number}
 */
const latestFirst = (a, b) => -1 * earliestFirst(a, b);

/**
 * @param {Record[]} records
 * @returns {Record[]}
 */
export const findEarlyRecords = (records) => {
	records = [...records].sort(earliestFirst);
	return records.slice(0, 5); // getOutliers(records, 'date', { highLow: 'low' }),
};

/**
 * @param {Record[]} records
 * @returns {Record[]}
 */
export const findLateRecords = (records) => {
	records = [...records].sort(latestFirst);
	return records.slice(0, 5); // getOutliers(records, 'date'),
};

/**
 * @param {Record[]} records
 * @returns {Stat[]}
 */
export const throughput = (records) => {
	records = [...records].sort(earliestFirst);
	return [
		{
			heading: 'Throughput upper bound',
			content: Math.round(
				records.reduce((total, { numberIndex }) => total + numberIndex, 0)
			)
		},
		{
			heading: 'Throughput lower bound',
			content: Math.round(
				group(records, ({ location }) => location)
					.map((records) =>
						Math.max(...records.map(({ numberIndex }) => numberIndex))
					)
					.reduce((total, value) => total + value, 0)
			)
		},
		{
			heading: 'Throughput assuming each bird stays 2 days',
			content: Math.round(
				group(records, ({ location }) => location)
					.flatMap((records) =>
						records.map((record, i) => {
							if (i % 2 === 1) {
								return {
									...record,
									numberIndex: Math.max(
										0,
										record.numberIndex - records[i - 1].numberIndex
									)
								};
							}
							return record;
						})
					)
					.reduce((total, { numberIndex }) => total + numberIndex, 0)
			)
		},
		{
			heading: 'Throughput assuming each bird stays 3 days',
			content: Math.round(
				group(records, ({ location }) => location)
					.flatMap((records) =>
						records.map((record, i) => {
							if (i % 3 === 1) {
								return {
									...record,
									numberIndex: Math.max(
										0,
										record.numberIndex - records[i - 1].numberIndex
									)
								};
							}
							if (i % 3 === 2) {
								return {
									...record,
									numberIndex: Math.max(
										0,
										record.numberIndex -
											Math.max(
												records[i - 1].numberIndex,
												records[i - 2].numberIndex
											)
									)
								};
							}
							return record;
						})
					)
					.reduce((total, { numberIndex }) => total + numberIndex, 0)
			)
		}
	];
};
