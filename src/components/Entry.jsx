import React from 'react';
import {getNumberOfSites, getCitywideSiteCounts, getCitywideCounts, getHighSiteCounts} from '../lib/data-tools';
import {Card, Button, Accordion} from 'react-bootstrap';

const CitywideCount = ({records}) => {
	const {highestCount, details} = getCitywideCounts(records);
	return <>{highestCount} ({details.map(({date}, i) => <>{i > 0 ? (<>, </>) : null}{date.toDateString()}</>)})</>
}

const CitywideSites = ({records}) => {
	const {highestCount, details} = getCitywideSiteCounts(records);
	return <>{highestCount} ({details.map(({date}, i) => <>{i > 0 ? <>, </> : null}{date.toDateString()}</>)})</>
}

const SingleSiteCounts = ({records}) => {
	const counts = getHighSiteCounts(records);

	return <ul>
		{counts.map(({location, date, numberIndex}) => <li>{location}, {date.toDateString()}: <b>{numberIndex}</b></li>)}
	</ul>
}


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
		return <EntryCard heading={`${heading}: No records`} />
	}
	const body = <>
	{preContent}
	<ul>
	<li>Number of sites: {getNumberOfSites(records)}</li>
	<li>Max citywide day count: <CitywideCount records={records} /></li>
	<li>Max citywide sites in a day: <CitywideSites records={records} /></li>
	<li>Single site counts: <SingleSiteCounts records={records} /></li>
	</ul>
	{postContent}
</>

	return isAccordion ?
		<AccordionEntryCard heading={heading} body={body} eventKey={"" + index} /> : <EntryCard heading={heading} body={body} />

}






