import React from 'react'
import {Card, Button, Accordion, Table} from 'react-bootstrap'
import {group, getOutliers, sortPropDesc} from '../lib/data-tools'
import {Records, Record} from './Records'

const getNumberOfSites = records => {
	const sites = new Set()
	records.forEach(({location}) => sites.add(location))
	return [...sites].length
}

const aggregate = records => {
	records = records.sort(sortPropDesc('numberIndex'))
	const maxNumberIndex = records[0].numberIndex
	const occasions = records.filter(({numberIndex}) => numberIndex === maxNumberIndex)

	return {
		...records[0],
		...(occasions.length > 1 ? {
			dates: occasions.map(({date}) => date),
			locations: occasions.map(({location}) => location)
		} : {}),
		records: getOutliers(records, 'numberIndex')
	}
}

const aggregateByDay = (func) => (records) => {

	records = group(records, ({date}) => date.toISOString())
		.map(records => ({
			records,
			date: records[0].date,
			numberIndex: func(records)
		}))
		.sort(sortPropDesc('numberIndex'))

		if (!records.length) {
			return {
				numberIndex: 0,
				records: []
			}
		}
		return aggregate(records)
}

const EntryCard = ({heading, body}) => (
  <Card>
    <Card.Header>
      {heading}
    </Card.Header>
    {body ? <Card.Body>{body}</Card.Body> : null}
  </Card>
)

const AccordionEntryCard = ({heading, body, eventKey}) => body ? (
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
        {heading}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={eventKey}>
      <Card.Body>{body}</Card.Body>
    </Accordion.Collapse>
  </Card>
) : <EntryCard heading={heading} />


const TableRow = ({heading, content}) => (
  <tr>
    <th>{heading}</th>
    <td>{content}</td>
  </tr>
)

export const Entry = ({heading, records, isAccordion = false, index,
	preContent = [], postContent = []}) => {
	if (!records.length) {
		return null
	}
	console.log(preContent, postContent)
	const body = (
  <>

    <Table>
      <tbody>
        {preContent.map(props => <TableRow {...props} />)}
        <TableRow
          heading="Number of sites"
          content={getNumberOfSites(records)}
        />
        <TableRow
          heading="Max citywide day count"
          content={(
            <Record {...aggregateByDay(
records => records.reduce((sum, {numberIndex}) => sum + numberIndex, 0)
	)(records)}
            />
)}
        />
        <TableRow
          heading="Max citywide sites in a day"
          content={(
            <Record {...aggregateByDay(
records => records.length
	)(records)}
            />
)}
        />
        <TableRow
          heading="High single site counts"
          content={<Record {...aggregate(getOutliers(records, 'numberIndex'))} />}
        />
        {postContent.map(props => <TableRow {...props} />)}
      </tbody>
    </Table>

  </>
)

	return isAccordion ?
  <AccordionEntryCard heading={heading} body={body} eventKey={`${  index}`} /> : <EntryCard heading={heading} body={body} />

}






