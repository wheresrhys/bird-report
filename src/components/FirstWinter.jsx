const React = require('React');
const {getMonthsOfRecords} = require('../lib/data-tools')
const {Entry} = require('./Entry')

const FirstWinter = ({records, distribution}) => {

	// If it's not a widespread breeder then we assume winter stretches
	// into March
	const notWidespreadBreeder = distribution.b < 3;
	const months = notWidespreadBreeder < 3 ? [1, 2, 3] : [1, 2]

	return <section>
<h1>First winter (January to March)</h1>
<ul>
	<Entry heading="January" records={getMonthsOfRecords(records, 1)} />
	<Entry heading="February" records={getMonthsOfRecords(records, 2)} />
	{notWidespreadBreeder ? <Entry heading="March" records={getMonthsOfRecords(records, 3)} /> : null}
	<Entry heading="Whole period" records={getMonthsOfRecords(records, ...months)} includeSites={false} />
</ul>

	</section>
}


module.exports = {FirstWinter}
