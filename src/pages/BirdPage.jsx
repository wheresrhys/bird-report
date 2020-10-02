const React = require('react')
const {FirstWinter} = require('../components/FirstWinter')
const {Spring} = require('../components/Spring')
const Breeding = () => <pre>holding</pre>
const {Autumn} = require('../components/Autumn')
const {SecondWinter} = require('../components/SecondWinter')
const {getMonthsOfRecords, group} = require('../lib/data-tools')

const getBreedingSites = records => {
	const breedingMonths = [5, 6];
	records = getMonthsOfRecords(records, ...breedingMonths);

	return group(records, ({location}) => location)
		.map(items => items.length > 2 ? {
			items,
			location: items[0].location
		} : null)
		.filter(items => !!items)
}

const BirdPage = props => {
	let breedingSites = []
	if (props.distribution.b && props.distribution.b < 3) {
		breedingSites = getBreedingSites(props.records)
	}
	return <html><head></head><body>
	{props.distribution.w ? <FirstWinter {...props} /> : null}
	{props.distribution.s ? <Spring {...props} breedingSites={breedingSites}/> : null}
	{props.breeding ? <Breeding {...props} /> : null}
	{props.distribution.a ? <Autumn {...props} breedingSites={breedingSites}/> : null}
	{props.distribution.w ? <SecondWinter {...props} /> : null}
</body></html>}

module.exports = { BirdPage }
