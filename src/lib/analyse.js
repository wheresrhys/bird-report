const UNKNOWN = 0
const VAGRANT = 1;
const LOCALISED = 2;
const COUNTABLE = 3;
const WIDESPREAD = 4;

const WINTER = 'w';
const SPRING = 's';
const BREEDING = 'b';
const AUTUMN = 'a';

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

const groupByLocationAndDate = records => group(records, ({date, location}) => location + date.toISOString())
		.map(list => ({
			items: list,
			location: list[0].location,
			date: list[0].date,
			total: list.reduce((sum, {numberIndex, notes}) => {
				// bit of a fudge, but if somebody's botherd to add notes, there might
				// be enough information to determine they are different birds... so
				// worth a look
				// return notes ? sum + numberIndex / 2 : Math.max(sum, numberIndex);
				return Math.max(sum, numberIndex);
			}, 0)
		}))
		.sort(sortPropDesc('total'))

const getLondonCounts = (records) => {
	return group(groupByLocationAndDate(records), ({date}) => date.toISOString())
		.map(list => ({
			items: list,
			date: list[0].date,
			sites: list.length,
			total: list.reduce((sum, {total}) => sum + total, 0)
		}))
}

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

const getHighLocalCounts = (records) => {
	const counts = groupByLocationAndDate(records)
	return getOutliers(counts, 'total')
}



const getNumberOfSites = records => {
	const sites = new Set();
	records.forEach(({location}) => sites.add(location));
	return [...sites].length;
}

const summarize = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months);
	const highCounts = getHighLocalCounts(records)
	const londonCounts = getLondonCounts(records)
	const highLondonCounts = getOutliers(londonCounts, 'total')
	const widespreadLondon = getOutliers(londonCounts, 'sites')

	return {
		numberOfSites: getNumberOfSites(records),
		highCounts,
		highCountOccasions: highCounts.length,
		highestSingleCount: highCounts.sort(sortPropDesc('numberIndex'))[0],
		highLondonCounts,
		highLondonCountOccasions: highLondonCounts.length,
		highestLondonCount: highLondonCounts.sort(sortPropDesc('total'))[0],
		mostWidespreadLondonDay: widespreadLondon.sort(sortPropDesc('sites'))[0],
		// highestDayCount: {}, // date, total
	// 			highestSingleCount: {}, // date, location, number

	// 			mostWidespreadDay: {}, //date, totalSites, list of sites
	// 			totalSites: {} // totalSites, list of sites
	}
}

const analyseWinter = records => ({
	january: summarize(records, 1),
	february: summarize(records, 2),
	...(b < 3 ? {march: summarize(records, 3), november: summarize(records, 3)} : {}),
	december: summarize(records, 12),
	firstWinter: summarize(records, 1, 2, 3),
	secondWinter: summarize(records, 11, 12)
})

const findEarlyRecords = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months).sort(earliestFirst);
	const dates = records.flatMap(({date, numberIndex}) => [...Array(Math.ceil(numberIndex))].map(() => date.getTime()) )
	const m = mean(dates);
	const sd = standardDeviation(dates);

	const lowOutlierBoundary = new Date(m - sd)
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

	const highOutlierBoundary = new Date(m + sd)
	return {
		latest: records[0],
		late: records.filter(({date}) => date > highOutlierBoundary)
	}
}

const sum = (records, ...months) => {
	records = getMonthsOfRecords(records, ...months).sort(earliestFirst);
	return {
		upperBound: records.reduce((total, {numberIndex}) => total + numberIndex, 0),
		lowerBound: group(records, ({location}) => location)
			.map(records => Math.max(...records.map(({numberIndex}) => numberIndex)))
			.reduce((total, value) => total + value, 0)
	}
}

const analyseSpring = (records, {w, b}) => {
	// if resident assume short distance migrant
	// else assume long distance migrant

	const passageMonths = [3, 4, 5];
	if (!b) {
		passageMonths.push(6)
	}
	if (!w) {
		passageMonths.unshift(2)
	}
	// peaknumbers
	// total sites
	return {
		// march: summarize(records, 3),
		// april: summarize(records, 4),
		// may: summarize(records, 5),
		...(w ? {} : {earlies: findEarlyRecords(records, 2, 3, 4)}),
		...(b ? {} : {
			june: summarize(records, 6),
			lates: findLateRecords(records, 5)
		}),
		...((b > 2 || w > 2) ? {} : {totalThrough: sum(records, ...passageMonths)}),
		...summarize(records, ...passageMonths)
	}
}

const analyseAutumn = (records, {w, b, ignoreLocations = []}) => {
	const passageMonths = [7, 8, 9, 10];
	if (b <= 2) {
		passageMonths.unshift(6)
	}
	if (w <= 1) {
		passageMonths.push(11, 12)
	}
	return {
		// june: summarize(records, 6),
		// july: summarize(records, 7),
		// august: summarize(records, 8),
		// september: summarize(records, 9),
		// october: summarize(records, 10),
		...(b > 2 ? {} : {june: summarize(records, 6),
			earlies: findEarlyRecords(records.filter(({location}) => !ignoreLocations.includes(location)), 7, 8)
		}),
		...(w > 1 ? {} : {lates: findLateRecords(records, 10, 11, 12)}),
		...((b > 2 || w > 2) ? {} : {totalThrough: sum(records, ...passageMonths)}),
		...summarize(records, ...passageMonths)
	}
}


const analyseBreeding = records => {
	const breedingMonths = [6];
	records = getMonthsOfRecords(records, ...breedingMonths);

	const sites = group(records, ({location}) => location)
		.map(items => ({
			items,
			location: items[0].location
		}))

	return {
		sites
	}
}
const analyse = (records, {w, s, b, a}) => {
	// Need a daily histogram
	const results = {};
	if (w) {
		results.winter = analyseWinter(records);
	}
	if (s) {
		results.spring = analyseSpring(records, {w, b})
	}

	if (b === 2) {
		results.breeding = analyseBreeding(records, {b})
	}

	if (a) {
		results.autumn = analyseAutumn(records, {w, b, ignoreLocations: results.breeding && results.breeding.sites.map(({location}) => location)})
	}

	results.innerLondon = group(records.filter(({viceCounty}) => viceCounty === 'IL'), ({location}) => location)

	return results
}


module.exports = {analyse}
