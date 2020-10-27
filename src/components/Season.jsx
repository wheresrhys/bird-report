import React from 'react'
import {Accordion} from 'react-bootstrap'
import { getMonthsOfRecords } from '../lib/data-tools'
import {Entry, Month} from './Entry'

const MONTH_NAMES = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const monthsToNames = months => `${MONTH_NAMES[months[0]]} to ${MONTH_NAMES[months[months.length-1]]}`

export function Season ({heading, preContent, postContent, months, records}) {
return (
  <section>
    <h2>
      {heading}
      {' '}
      (
      {monthsToNames(months)}
      )
    </h2>

    <Accordion defaultActiveKey="0">
      <Entry isAccordion index={0} heading="Summary" records={getMonthsOfRecords(records, ...months)} preContent={preContent} postContent={postContent} />
    </Accordion>


  </section>
)
}

