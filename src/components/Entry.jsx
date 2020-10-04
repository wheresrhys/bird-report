import React from 'react';
import {getNumberOfSites, getCitywideSiteCounts, getCitywideCounts, getHighSiteCounts} from '../lib/data-tools';
import {Card, Button, Accordion, Table} from 'react-bootstrap';
import {Records, Record} from './Records';

const EntryCard = ({heading, body}) => <Card>
  <Card.Header>
      {heading}
  </Card.Header>
  {body ? <Card.Body>{body}</Card.Body> : null}
</Card>

const AccordionEntryCard = ({heading, body, eventKey}) => body ? <Card>
  <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
        {heading}
      </Accordion.Toggle>
  </Card.Header>
  <Accordion.Collapse eventKey={eventKey}>
      <Card.Body>{body}</Card.Body>
    </Accordion.Collapse>
</Card> : <EntryCard heading={heading} />


export const Entry = ({heading, records, isAccordion = false, index,
	preContent = null, postContent = null}) => {
	if (!records.length) {
		return null
	}
	const body = <>
	{preContent}
	<Table >
  <tbody>
    <tr><th>Number of sites</th><td>{getNumberOfSites(records)}</td></tr>
		<tr><th>Max citywide day count</th><td> <Record {...getCitywideCounts(records)} /></td></tr>
		<tr><th>Max citywide sites in a day</th><td> <Record {...getCitywideSiteCounts(records)} /></td></tr>
		<tr><th>High single site counts</th><td><Record {...getHighSiteCounts(records)} /></td></tr>
  </tbody>
</Table>
	{postContent}
</>

	return isAccordion ?
		<AccordionEntryCard heading={heading} body={body} eventKey={"" + index} /> : <EntryCard heading={heading} body={body} />

}






