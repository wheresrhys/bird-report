import React from 'react';
import {Season} from './Season';


export const SecondWinter = ({records, distribution}) => {

	return <Season heading="Second winter" months={[11, 12]} records={records} />
}

export const FirstWinter = ({records, distribution}) => {

	// If it's not a widespread breeder then we assume winter stretches
	// into March
	const notWidespreadBreeder = distribution.b < 3;
	const months = notWidespreadBreeder < 3 ? [1, 2, 3] : [1, 2]

	return <Season heading="First winter" months={months} records={records} />
}
