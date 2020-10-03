
const {standardDeviation, mean} = require('simple-statistics')

export const sortPropAsc = (prop) =>
	(a, b) => a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1

export const sortPropDesc = (prop) => {
	const asc = sortPropAsc(prop);
	return (a, b) => -1 * asc(a, b)
}

export const earliestFirst = sortPropAsc('date')

export const latestFirst = (...args) => -1 * earliestFirst(...args)

export const getMonthsOfRecords = (records, ...months) => records.filter(({date}) => months.includes(new Date(date).getMonth() + 1))

export const group = (records, keyAlgo) => {
	const lists = records.reduce((lists, record) => {
		const key = keyAlgo(record);
		lists[key] = lists[key] || [];
		lists[key].push(record);
		return lists;
	}, {})
	return Object.values(lists)
}

export const getNumberOfSites = records => {
	const sites = new Set();
	records.forEach(({location}) => sites.add(location));
	return [...sites].length;
}

export const clean = records => group(records, ({date, location}) => location + date.toISOString())
	.map(records => {
		records = records.sort(sortPropDesc('numberIndex'))
		return {
			...records[0],
			records
		}
	})

export const getOutliers = (list, prop, {tolerance = 2, minResults = 1, highLow = 'high'} = {}) => {
	if (!list.length) {
		return []
	}
	const numbers = list.map(obj => obj[prop]);
	const m = mean(numbers);
	const sd = standardDeviation(numbers);
	const comparator = highLow === 'high' ? val => val >= m + (tolerance * sd) : val => val <= m - (tolerance * sd)
	return list.filter((obj, i) => comparator(obj[prop]) || i < minResults)
}

export const getCitywideCounts = (records) => {
	const counts = group(records, ({date}) => date.toISOString())
		.map(list => ({
			items: list,
			date: list[0].date,
			sites: list.length,
			total: list.reduce((sum, {numberIndex}) => sum + numberIndex, 0)
		}))
		.sort(sortPropDesc('total'))

		if (!counts.length) {
			return  {
		highestCount: 0,
		details: [],
		all: [],
		outliers: []
	}
		}
		const highestCount = counts[0].total;

	return {
		highestCount,
		details: counts.filter(({total}) => total === highestCount),
		all: counts,
		outliers: getOutliers(counts, 'total')
	}
}

export const getCitywideSiteCounts = (records) => {
	const counts = group(records, ({date}) => date.toISOString())
		.map(list => ({
			items: list,
			date: list[0].date,
			sites: list.length,
			total: list.reduce((sum, {numberIndex}) => sum + numberIndex, 0)
		}))
		.sort(sortPropDesc('sites'))

		if (!counts.length) {
			return  {
				highestCount: 0,
				details: [],
				all: [],
				outliers: []
			}
		}
		const highestCount = counts[0].sites;

	return {
		highestCount,
		details: counts.filter(({sites}) => sites === highestCount),
		all: counts,
		outliers: getOutliers(counts, 'sites')
	}
}

export const getHighSiteCounts = (records) => getOutliers(records, 'numberIndex')

export const findEarlyRecords = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months).sort(earliestFirst);
	return {
		earliest: records[0],
		early: getOutliers(records, 'date', {highLow: 'low'})
	}
}

export const findLateRecords = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months).sort(latestFirst);
	return {
		latest: records[0],
		late: getOutliers(records, 'date')
	}
}
