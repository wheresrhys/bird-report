import React, {useState} from 'react'
import { Button, Collapse} from 'react-bootstrap'

export function Record ({
  date, dates = [date],
  location = null, locations = [location],
  numberIndex, records, viewMoreHeading, notes, observer}) {

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

export function Records({records, heading = 'View nested records'}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {heading}
      </Button>
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


