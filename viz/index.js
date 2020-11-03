const csvThen = require('csv-then');
const OsGridRef = require('mt-osgridref');

const firstJan = new Date('01-Jan-18').getTime();
const oneDay = 1000 * 60 * 60 * 24;

csvThen.fromFile('birds.csv')
	.then(async rows => {
		const species = rows.map(({SPECIES: species, Location: location, 'Date:D': date, NumberIndex: count}) => {
			return {
				species,
				location: OsGridRef.osGridToLatLong(OsGridRef.parse(location)),
				day: (new Date(date).getTime() - firstJan) / oneDay,
				count: +count
			}
		}).reduce((obj, row) => {
			obj[row.species].push(row)
			return obj
		}, {
			'Whinchat': [],
			'Stonechat': [],
			'Wheatear': []
		})
		require('fs').writeFileSync('whinchat.json', JSON.stringify(species.Whinchat.map(({count, location, day}) => ({
			count,
			day: Math.floor(day),
			lat: location._lat,
			lon: location._lon,
		}))))
		require('fs').writeFileSync('Wheatear.json', JSON.stringify(species.Wheatear.map(({count, location, day}) => ({
			count,
			day: Math.floor(day),
			lat: location._lat,
			lon: location._lon,
		}))))
		require('fs').writeFileSync('Stonechat.json', JSON.stringify(species.Stonechat.map(({count, location, day}) => ({
			count,
			day: Math.floor(day),
			lat: location._lat,
			lon: location._lon,
		}))))
	})
