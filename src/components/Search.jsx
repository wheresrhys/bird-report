import React, {useState} from 'react';
import elasticlunr from 'elasticlunr'
import { Form } from 'react-bootstrap'
import {Records} from './Records';

export function Search ({records}) {
	const [results, setResults] = useState([]);

	const index = elasticlunr();
	index.addField('notes');
  index.addField('location');
  index.setRef('id');

	records.forEach((doc, id) =>
		index.addDoc({...doc, id})
	)

	const search = event => {
		const query = event.target.value;
		const searchResults = index.search(query).map(({ref}) => Number(ref))
		setResults(searchResults.map(i => records[i]))
	}

	return <div>
	<Form.Control placeholder="Search for whole words" as="input" defaultValue="" onChange={search} />
	<Records records={results} initiallyOpen={true}/>
</div>
}
