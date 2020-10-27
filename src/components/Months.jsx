import React from 'react'
import {Accordion} from 'react-bootstrap'
import { getMonthsOfRecords } from '../lib/data-tools'
import {Entry, Month} from './Entry'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const monthsToNames = months => `${MONTH_NAMES[months[0]]} to ${MONTH_NAMES[months[months.length-1]]}`

export function Months ({heading, preContent, postContent, months, records}) {
return (
  <section>
    <Accordion defaultActiveKey="0">

      {MONTH_NAMES.map((month, index) =>

        <Entry allowEmpty isAccordion index={index} heading={month} records={getMonthsOfRecords(records, index + 1)} />
		)}
    </Accordion>
  </section>
)
}

