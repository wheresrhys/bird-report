
const {standardDeviation, mean} = require('simple-statistics')

const sortPropAsc = (prop) =>
	(a, b) => a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1

const sortPropDesc = (prop) => {
	const asc = sortPropAsc(prop);
	return (a, b) => -1 * asc(a, b)
}

const earliestFirst = sortPropAsc('date')

const latestFirst = (...args) => -1 * earliestFirst(...args)

const getMonthsOfRecords = (records, ...months) => records.filter(({date}) => months.includes(new Date(date).getMonth() + 1))

const group = (records, keyAlgo) => {
	const lists = records.reduce((lists, record) => {
		const key = keyAlgo(record);
		lists[key] = lists[key] || [];
		lists[key].push(record);
		return lists;
	}, {})
	return Object.values(lists)
}

const getNumberOfSites = records => {
	const sites = new Set();
	records.forEach(({location}) => sites.add(location));
	return [...sites].length;
}


const groupByLocationAndDate = records => group(records, ({date, location}) => location + date.toISOString())
		.map(list => ({
			items: list,
			location: list[0].location,
			date: list[0].date,
			total: list.reduce((sum, {numberIndex, notes}) => {
				return Math.max(sum, numberIndex);
			}, 0)
		}))
		.sort(sortPropDesc('total'))


const getOutliers = (list, prop, {tolerance = 2, minResults = 1} = {}) => {
	if (!list.length) {
		return []
	}
	const numbers = list.map(obj => obj[prop]);
	const m = mean(numbers);
	const sd = standardDeviation(numbers);
	const highThreshold = m + 2 * sd;

	return list.filter((obj, i) => obj[prop] >= highThreshold || i < minResults)
}

const getCitywideCounts = (records) => {
	const counts = group(groupByLocationAndDate(records), ({date}) => date.toISOString())
		.map(list => ({
			items: list,
			date: list[0].date,
			sites: list.length,
			total: list.reduce((sum, {total}) => sum + total, 0)
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

const getCitywideSiteCounts = (records) => {
	const counts = group(groupByLocationAndDate(records), ({date}) => date.toISOString())
		.map(list => ({
			items: list,
			date: list[0].date,
			sites: list.length,
			total: list.reduce((sum, {total}) => sum + total, 0)
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

const getHighSiteCounts = (records) => {
	const counts = groupByLocationAndDate(records)
	return getOutliers(counts, 'total')
}


const findEarlyRecords = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months).sort(earliestFirst);
	const dates = records.flatMap(({date, numberIndex}) => [...Array(Math.ceil(numberIndex))].map(() => date.getTime()) )
	const m = mean(dates);
	const sd = standardDeviation(dates);

	const lowOutlierBoundary = new Date(m - 2 * sd)
	return {
		earliest: records[0],
		early: records.filter(({date}) => date < lowOutlierBoundary)
	}
}

const findLateRecords = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months).sort(latestFirst);
	const dates = records.flatMap(({date, numberIndex}) => [...Array(Math.ceil(numberIndex))].map(() => date.getTime()) )
	const m = mean(dates);
	const sd = standardDeviation(dates);

	const highOutlierBoundary = new Date(m + 2 * sd)
	return {
		latest: records[0],
		late: records.filter(({date}) => date > highOutlierBoundary)
	}
}

module.exports = {
	getMonthsOfRecords,
	group,
	sortPropAsc,
	sortPropDesc,
	latestFirst,
	earliestFirst,
	getNumberOfSites,
	getCitywideCounts,
	getCitywideSiteCounts,
	getHighSiteCounts,
	findLateRecords,
	findEarlyRecords

}


