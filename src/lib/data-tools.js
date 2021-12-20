import { standardDeviation, mean } from 'simple-statistics';

/**
 * @typedef {import('./data-loader.js').BirdRecord} BirdRecord
 */

/**
 * @typedef {Object} AggregateRecord
 * @implements {BirdRecord}
 * @property {Record[]} [records]
 */

/** @typedef {(AggregateRecord | BirdRecord) } Record */

// export const earliestFirst = sortPropAsc('date')

// export const latestFirst = (...args) => -1 * earliestFirst(...args)

/**
 * @param {string} prop
 * @returns {(a: any, b: any) => number}
 */
export const sortPropAsc = (prop) => (a, b) =>
	a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;

/**
 * @param {string} prop
 * @returns {(a: any, b: any) => number}
 */
export const sortPropDesc = (prop) => {
	const asc = sortPropAsc(prop);
	return (a, b) => -1 * asc(a, b);
};

/**
 * @param {Record[]} records
 * @param {number[]} months
 * @returns {Record[]}
 */
export const getMonthsOfRecords = (records, ...months) =>
	records.filter(({ date }) => months.includes(new Date(date).getMonth() + 1));

/**
 * @param {Record[]} records
 * @param {function} keyAlgo
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
				...(records.length > 1 ? { records } : {}),
				aggregationType: 'same location'
			};
		})
		.sort(sortPropAsc('date'));

/**
 * @param {Record[]} list
 * @param {string} prop
 * @param {Object} [options]
 * @param {number} [options.tolerance]
 * @param {number} [options.minResults]
 * @param {string} [options.highLow]
 * @returns {Record[]}
 */
export const getOutliers = (
	list,
	prop,
	{ tolerance = 2, minResults = 1, highLow = 'high' } = {}
) => {
	if (!list.length) {
		return [];
	}
	const numbers = list.map((obj) => obj[prop]);
	const m = mean(numbers);
	const sd = standardDeviation(numbers);
	const sorter =
		highLow === 'high'
			? sortPropDesc('numberIndex')
			: sortPropAsc('numberIndex');
	return list
		.filter((obj, i) => {
			if (i < minResults) return true;
			if (highLow === 'high') {
				return obj[prop] >= m + tolerance * sd;
			} else {
				return obj[prop] <= m - tolerance * sd;
			}
		})
		.sort(sorter);
};

/**
 * @param {Record[]} records
 * @returns {number}
 */
export const getNumberOfSites = (records) => {
	const sites = new Set();
	records.forEach(({ location }) => sites.add(location));
	return [...sites].length;
};

/**
 * @param {Record[]} records
 * @returns {number}
 */
export const countRecords = (records) => records.length;

/**
 * @param {Record[]} records
 * @returns {number}
 */
export const countBirds = (records) =>
	records.reduce((sum, { numberIndex }) => sum + numberIndex, 0);

/**
 * @param {Record[]} records
 * @returns {AggregateRecord}
 */
export const aggregate = (records) => {
	records = [...records].sort(sortPropDesc('numberIndex'));
	const maxNumberIndex = records[0].numberIndex;
	const occasions = records.filter(
		({ numberIndex }) => numberIndex === maxNumberIndex
	);

	return {
		...records[0],
		...(occasions.length > 1
			? {
					dates: occasions.map(({ date }) => date),
					locations: occasions.map(({ location }) => location)
			  }
			: {}),
		records: getOutliers(records, 'numberIndex')
	};
};
/**
 * @param {Record[]} records
 * @param {function} func
 * @returns {AggregateRecord}
 */
export const aggregateByDay = (records, func) => {
	records = group(records, ({ date }) => date.toISOString())
		.map((records) => ({
			records,
			date: records[0].date,
			numberIndex: func(records),
			aggregationType: 'same day'
		}))
		.sort(sortPropDesc('numberIndex'));

	if (!records.length) {
		return {
			numberIndex: 0,
			records: []
		};
	}
	return aggregate(records);
};


export  const getBreedingSites = (records, settings) => {
    if (settings.breeding<1) {
      return [];
    }

    const breedingMonths = [5, 6]
    records = getMonthsOfRecords(records, ...breedingMonths)

    return group(records, ({location}) => location)
      .map(records => records.length > 2 ? {
        records,
        location: records[0].location
      } : null)
      .filter(records => !!records)
  }

export const findEarlyRecords = (records) => {
  records = [...records].sort(earliestFirst)
  return {
    ...records[0],
    records: records.slice(0, 5)// getOutliers(records, 'date', { highLow: 'low' }),
  }
}

export const findLateRecords = (records) => {
  records = [...records].sort(latestFirst)
  return {
    ...records[0],
    records: records.slice(0, 5)// getOutliers(records, 'date'),
  }
}

export const throughput = (records) => {
  records = [...records].sort(earliestFirst)
  return {
    'Upper bound': Math.round(records.reduce(
      (total, { numberIndex }) => total + numberIndex,
      0,
    )),
    'Lower bound': Math.round(group(records, ({ location }) => location)
      .map((records) => Math.max(...records.map(({ numberIndex }) => numberIndex)))
      .reduce((total, value) => total + value, 0)),
    'Assuming each bird stays 2 days': Math.round(group(records, ({ location }) => location)
      .flatMap((records) => records.map((record, i) => {
      	if (i % 2 === 1) {
      		return {
      			...record,
      			numberIndex: Math.max(0, record.numberIndex - records[i - 1].numberIndex)
      		}
	      }
	      return record
	    }))
      .reduce((total, {numberIndex}) => total + numberIndex, 0)),
    'Assuming each bird stays 3 days': Math.round(group(records, ({ location }) => location)
      .flatMap((records) => records.map((record, i) => {
      	if (i % 3 === 1) {
      		return {
      			...record,
      			numberIndex: Math.max(0, record.numberIndex - records[i - 1].numberIndex)
      		}
	      }
	      if (i % 3 === 2) {
      		return {
      			...record,
      			numberIndex: Math.max(0, record.numberIndex - Math.max(records[i - 1].numberIndex, records[i - 2].numberIndex))
      		}
	      }
	      return record
	    }))
      .reduce((total, {numberIndex}) => total + numberIndex, 0))
  }
}
