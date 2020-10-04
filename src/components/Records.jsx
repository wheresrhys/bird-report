import React, {useState} from 'react';
import { Button, Collapse} from 'react-bootstrap';

export function Record ({date, dates = [date], location = null, locations = [location], numberIndex, records}) {
  return <><div><b>{numberIndex}:</b>
    {dates.map((date, i) => <div>
      {locations[i] ? `${locations[i]}, ` : null}
      {date.toDateString()}</div>)
  }</div>
    {records ? <Records records={records} /> : null }
  </>
}

export function Records({records, heading = "View records"}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {heading}
      </Button>
      <Collapse in={open}>
        <ul>
          {records.map(props => <li><Record {...props} /></li>)}
        </ul>
      </Collapse>
    </>
  );
}

