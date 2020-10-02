const React = require('React');
const {getMonthsOfRecords} = require('../lib/data-tools')
const {Entry} = require('./Entry')

const SecondWinter = ({records, distribution}) => {
	return <section>
<h1>Second winter (November and December )</h1>
<ul>
	<Entry heading="November" records={getMonthsOfRecords(records, 11)} />
	<Entry heading="December" records={getMonthsOfRecords(records, 12)} />
	<Entry heading="Whole period" records={getMonthsOfRecords(records, 11, 12)} includeSites={false} />
</ul>

	</section>
}


module.exports = {SecondWinter}
