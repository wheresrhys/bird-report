// import { standardDeviation, mean } from 'simple-statistics'

export const sortPropAsc = (prop) => (a, b) => a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;

export const sortPropDesc = (prop) => {
	const asc = sortPropAsc(prop);
	return (a, b) => -1 * asc(a, b);
};

// export const earliestFirst = sortPropAsc('date')

// export const latestFirst = (...args) => -1 * earliestFirst(...args)

// *
//  * @param {Record[]} records}

// export const getMonthsOfRecords = (records, ...months) => records.filter(({ date }) => months.includes(new Date(date).getMonth() + 1))

/**
 * @typedef {import('./data-loader.js').BirdRecord} BirdRecord
 */

/**
 * @typedef {Object} AggregateRecord
 * @implements {BirdRecord}
 * @property {Record[]} [records]
 */

/** @typedef {(AggregateRecord | BirdRecord) } Record */

/**
 * @param {Record[]} records
 * @param {Function} keyAlgo
 * @returns {Record[][]}
 */
export const group = (records, keyAlgo) => {
	const lists = records.reduce((lists, record) => {
		const key = keyAlgo(record);
		lists[key] = lists[key] || [];
		lists[key].push(record);
		return lists;
	}, {});
	return Object.values(lists);
};

/**
 * @param {BirdRecord[]} records
 * @returns {AggregateRecord[]}
 */
export const clean = (records) =>
	group(records, ({ date, location }) => location + date.toISOString())
		.map((records) => {
			records = [...records].sort(sortPropDesc('numberIndex'));
			return {
				...records[0],
				...(records.length > 1 ? { records } : {})
			};
		})
		.sort(sortPropAsc('date'));

// export const getOutliers = (
//   list,
//   prop,
//   { tolerance = 2, minResults = 1, highLow = 'high' } = {},
// ) => {
//   if (!list.length) {
//     return []
//   }
//   const numbers = list.map((obj) => obj[prop])
//   const m = mean(numbers)
//   const sd = standardDeviation(numbers)
//   const comparator = highLow === 'high'
// 		  ? (val) => val >= m + tolerance * sd
// 		  : (val) => val <= m - tolerance * sd
//   const sorter = highLow === 'high' ? sortPropDesc('numberIndex') : sortPropAsc('numberIndex')
//   return list
//     .filter((obj, i) => comparator(obj[prop]) || i < minResults)
//     .sort(sorter)
// }

// export const findEarlyRecords = (records) => {
//   records = [...records].sort(earliestFirst)
//   return {
//     ...records[0],
//     records: records.slice(0, 5)// getOutliers(records, 'date', { highLow: 'low' }),
//   }
// }

// export const findLateRecords = (records) => {
//   records = [...records].sort(latestFirst)
//   return {
//     ...records[0],
//     records: records.slice(0, 5)// getOutliers(records, 'date'),
//   }
// }

// export const throughput = (records) => {
//   records = [...records].sort(earliestFirst)
//   return {
//     'Upper bound': Math.round(records.reduce(
//       (total, { numberIndex }) => total + numberIndex,
//       0,
//     )),
//     'Lower bound': Math.round(group(records, ({ location }) => location)
//       .map((records) => Math.max(...records.map(({ numberIndex }) => numberIndex)))
//       .reduce((total, value) => total + value, 0)),
//     'Assuming each bird stays 2 days': Math.round(group(records, ({ location }) => location)
//       .flatMap((records) => records.map((record, i) => {
//       	if (i % 2 === 1) {
//       		return {
//       			...record,
//       			numberIndex: Math.max(0, record.numberIndex - records[i - 1].numberIndex)
//       		}
// 	      }
// 	      return record
// 	    }))
//       .reduce((total, {numberIndex}) => total + numberIndex, 0)),
//     'Assuming each bird stays 3 days': Math.round(group(records, ({ location }) => location)
//       .flatMap((records) => records.map((record, i) => {
//       	if (i % 3 === 1) {
//       		return {
//       			...record,
//       			numberIndex: Math.max(0, record.numberIndex - records[i - 1].numberIndex)
//       		}
// 	      }
// 	      if (i % 3 === 2) {
//       		return {
//       			...record,
//       			numberIndex: Math.max(0, record.numberIndex - Math.max(records[i - 1].numberIndex, records[i - 2].numberIndex))
//       		}
// 	      }
// 	      return record
// 	    }))
//       .reduce((total, {numberIndex}) => total + numberIndex, 0))
//   }
// }
