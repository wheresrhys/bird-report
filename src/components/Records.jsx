import React, {useState} from 'react'
import { Button, Collapse, Table} from 'react-bootstrap'
import {group} from '../lib/data-tools'
const TableRow = ({heading, content}) => (
  <tr>
    <th>{heading}</th>
    <td>{content}</td>
  </tr>
)

export function DailyRecords ({initiallyOpen = false,heading, records}) {
  const [open, setOpen] = useState(initiallyOpen)
  const days = group(records, ({date}) => date.getDate())
    .sort((rs1, rs2) => {
      return rs1[0].date > rs2[0].date ? 1 : rs1[0].date < rs2[0].date ? -1 : 0;
    })

  return  (
      <>
        {initiallyOpen === false ? <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          {heading}
        </Button> : null}
        {open ? (
          <Collapse in={open}>
            <Table>
              <tbody>
              {days.map(records =>
                <TableRow
                  heading={records[0].date.getDate()}
                  content={<ul>

              {records.map(props => <li><Record {...props} /></li>)}
            </ul>}
                />)}
              </tbody>
            </Table>


          </Collapse>
  )  : null}
      </>
    )
}

export function Record ({
  date, dates = [date],
  location = null, locations = [location],
  numberIndex, records, viewMoreHeading, notes, observer, viceCounty}) {

  if (records && records.length === 1) {
    return <Record {...records[0]} />
  }

  const hasChildRecords = !!records;
  return (
    <>
      <div style={{display: 'flex'}}>
        <b style={{paddingRight: '5px'}}>
          {numberIndex}:
        </b>
        <div>
        <b>{viceCounty}</b>
        {dates.map((date, i) => (
          <div>
            {locations[i] ? `${locations[i]}, ` : null}
            {date.toDateString()}
            {!hasChildRecords ? <span>
              {notes ? `, ${notes}` : null}
              {observer ? `, ${observer}` : null}
            </span>: null}

          </div>

))}</div>

      </div>
      {hasChildRecords ? <Records records={records} heading={viewMoreHeading} /> : null }
    </>
)
}

export function Records({initiallyOpen = false,records, heading = 'View nested records'}) {
  const [open, setOpen] = useState(initiallyOpen)

  return (
    <>
      {initiallyOpen === false ? <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {heading}
      </Button> : null}
      {open ? (
        <Collapse in={open}>
          <ul>
            {records.map(props => <li><Record {...props} /></li>)}
          </ul>
        </Collapse>
)  : null}
    </>
  )
}


