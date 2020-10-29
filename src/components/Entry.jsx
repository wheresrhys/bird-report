import React from 'react'
import {Card, Button, Accordion, Table} from 'react-bootstrap'
import {group, getOutliers, sortPropDesc} from '../lib/data-tools'
import {Records, Record, AllRecords} from './Records'

const getNumberOfSites = records => {
	const sites = new Set()
	records.forEach(({location}) => sites.add(location))
	return [...sites].length
}

const aggregate = records => {
	records = [...records].sort(sortPropDesc('numberIndex'))
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
    <th style={{minWidth: '100px'}}>{heading}</th>
    <td>{content}</td>
  </tr>
)

const MaxOrForgetIt = ({aggregate, threshold = 1}) => {
  return aggregate.numberIndex > threshold ? <Record {...aggregate} /> : <div>Nothing of note</div>;
}

export const Entry = ({allowEmpty = false, heading, records, isAccordion = false, index,
  preContent = [], postContent = []}) => {
	if (!records.length) {
		return allowEmpty  ?  <EntryCard heading={heading} body={null} />: null
	}

  const maxCitywideDayCount = aggregateByDay(
records => records.reduce((sum, {numberIndex}) => sum + numberIndex, 0)
  )(records);

  const numberOfSites = getNumberOfSites(records);
  const highSingleSiteCount = aggregate(getOutliers(records, 'numberIndex'));

	const body = (
  <>

    <Table>
      <tbody>
        {preContent.map(props => <TableRow {...props} />)}
        <TableRow
          heading="Number of sites"
          content={numberOfSites}
        />
        {numberOfSites > 1 ? <TableRow
          heading="Max citywide sites in day"
          content={(
            <Record {...aggregateByDay(
records => records.length
  )(records)}
            />
)}
        /> : null}
        { maxCitywideDayCount.numberIndex > 1 ? <TableRow
          heading="Max citywide day count"
          content={(
            <Record {...maxCitywideDayCount}
            />
)}
        /> : null}

        {highSingleSiteCount.numberIndex > 1 ? <TableRow
          heading="High single site counts"
          content={<Record {...highSingleSiteCount} />}
        /> : null}
        {postContent.map(props => <TableRow {...props} />)}

      </tbody>
    </Table>
    <Records records={records} heading="View all records" />
  </>
)

  const Wrapper = isAccordion ? AccordionEntryCard : EntryCard

	return <Wrapper heading={heading} body={body} eventKey={`${  index}`} />

}






