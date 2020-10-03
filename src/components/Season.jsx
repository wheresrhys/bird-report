import React from 'react';
import { getMonthsOfRecords } from '../lib/data-tools';
import {Entry, Month} from './Entry'
import {Accordion} from 'react-bootstrap';
const MONTH_NAMES = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const monthsToNames = months => `${MONTH_NAMES[months[0]]} to ${MONTH_NAMES[months[months.length-1]]}`

export function Season ({heading, extraSummary = null, months, records}) {
return <section>
<h2>{heading} ({monthsToNames(months)})</h2>

<Accordion defaultActiveKey="0">
	<Entry isAccordion={true} index={0} heading="Summary" records={getMonthsOfRecords(records, ...months)} extraContent={extraSummary}/>

	{months.map((month, index) =>

	<Entry isAccordion={true} index={index + 1} heading={MONTH_NAMES[month]} records={getMonthsOfRecords(records, month)} />
		)}
</Accordion>


	</section>
}

