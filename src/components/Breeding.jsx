import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap'
import { getMonthsOfRecords, group } from '../lib/data-tools'
import {Records} from './Records'

export const getBreedingSites = (records, distribution) => {
	if (!(distribution.breeding && distribution.breeding < 3)) {
    return [];
  }
	const breedingMonths = [5, 6]
	records = getMonthsOfRecords(records, ...breedingMonths)

	return group(records, ({location}) => location)
		.map(records => records.length > 2 ? {
			records,
			location: records[0].location
		} : null)
		.filter(records => !!records)
}

export function Breeding ({records, distribution, breedingSites}) {
 	return <Accordion defaultActiveKey="0">
 	{breedingSites.map(({records, location}, i) => <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey={`breeding-${i}`}>
        {location}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={`breeding-${i}`}>
      <Card.Body>
      	<Records records={records} initiallyOpen={true}/>
      </Card.Body>
    </Accordion.Collapse>
  </Card>)}</Accordion>
}


