const readXlsxFile = require('read-excel-file/node')

// const getHistogram = records => {
// 	const months = [...Array(12)].map(() => 0)
// 	records.forEach(({date}) => months[date.getMonth()]++)
// 	return months
// }

// const getStatus = records => {
// 	// resident
// 	// winter
// 	// passage
// 	// summer
// }

// const moment = require('moment')
// const getSpringMigration = (records) => {
// 	records = records.sort(earliestFirst).filter(({date}) => date.getMonth() < 6)
// 	const values = records.flatMap(({date, numberIndex}) => [...Array(Math.ceil(numberIndex))].map(() => date.getTime()) )
// 	const m = mean(values);
// 	const sd = standardDeviation(values);

// 	const lowOutlierBoundary = new Date(m - 2 * sd)
// 	const highOutlierBoundary = new Date(m + 2 * sd)

// 	const densityMap = {}

// 	records.forEach(({date, numberIndex}) => {
// 		for (let i = 0; i < 15; i++) {
// 			const key = moment(date).add(i - 7, 'days').dayOfYear();
// 			densityMap[key] = densityMap[key] || {density: 0, count: 0};
// 			densityMap[key].density += numberIndex / (Math.abs(i - 7) + 1);
// 		}

// 		densityMap[moment(date).dayOfYear()].count += numberIndex;

// 	})

// 	console.log(densityMap)
// 	return {
// 		earliest: records[0],
// 		lowOutlierBoundary,
// 		highOutlierBoundary,
// 		early: records.filter(({date}) => date < lowOutlierBoundary && densityMap[moment(date).dayOfYear()].density < 2).length,
// 		late: records.filter(({date}) => date > highOutlierBoundary && densityMap[moment(date).dayOfYear()].density < 2).length
// 	}
// }

// const getHighDayCounts = records => {
// 	const byLocationAndDate = records.reduce((lists, record) => {
// 		const key = record.location + record.date;
// 		lists[key] = lists[key] || [];
// 		lists[key].push(record);
// 		return lists;
// 	}, {})
// 	const dayCounts = Object.values(byLocationAndDate)
// 		.map(list => ({
// 			items: list,
// 			location: list[0].location,
// 			date: list[0].date,
// 			total: list.reduce((sum, {numberIndex}) => sum + numberIndex, 0)
// 		}))
// 		.sort(sortPropDesc('total'))

// 	const totals = dayCounts.map(({total}) => total);
// 	const m = mean(totals);
// 	const sd = standardDeviation(totals);
// 	const highThreshold = m + 2 * sd;

// 	return dayCounts.filter(({total}) => total >= highThreshold)
// 		.map(({location, date, total}) => ({location, date, total}))
// }

const analyseRecords = (records, {
  winter, springPassage, breeding, autumnPassage,
}) => {
  // Need autumnPassage daily histogram
  const results = {}
  if (winter) {
    results.winter = analyseWinter(records)
  }
  if (springPassage) {
    results.spring = analyseSpring(records, { winter, breeding })
  }

  if (breeding === 2) {
    results.breeding = analyseBreeding(records, { breeding })
  }

  if (autumnPassage) {
    results.autumn = analyseAutumn(records, {
      winter,
      breeding,
      ignoreLocations:
				results.breeding
				&& results.breeding.sites.map(({ location }) => location),
    })
  }

  results.innerLondon = group(
    records.filter(({ viceCounty }) => viceCounty === 'IL'),
    ({ location }) => location,
  )

  return results
};

(async () => {
  analyseRecords(getSpecies('Stonechat')(records), {
    winter: 3,
    springPassage: 3,
    breeding: 2,
    autumnPassage: 3,
  })
  // analyseRecords(getSpecies('Wheatear')(records), {
  //   winter: 0,
  //   springPassage: 3,
  //   breeding: 0,
  //   autumnPassage: 3
  // })
  // analyseRecords(getSpecies('Whinchat')(records), {
  //   winter: 0,
  //   springPassage: 3,
  //   breeding: 0,
  //   autumnPassage: 3
  // })

  // console.log(getSpringMigration())
  // getHistogram(getSpecies('Whinchat')(records))
  // getHistogram(getSpecies('Stonechat')(records))
})()
