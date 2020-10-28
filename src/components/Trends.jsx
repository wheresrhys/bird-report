import React from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';
import moment from 'moment';

import {group} from '../lib/data-tools'

export function Trends ({records}) {
	const days = group(records, ({ date }) => date.toISOString())
		.map(records => {
			const locations = group(records, ({location}) => location);
			return {
				date: records[0].date,
				dayOfYear: moment(records[0].date).dayOfYear(),
				month: moment(records[0].date).format('MMM'),
				locations: locations.length,
				total: Math.round(locations
				.map((records) => Math.max(...records.map(({ numberIndex }) => numberIndex)))
				.reduce((total, value) => total + value, 0))
			}
		})

	const data = [...Array(365)].map((_, day) => days.find(({dayOfYear}) => dayOfYear === day + 1) || {
		month: moment().dayOfYear(day + 1).format('MMM'),
		locations: 0,
		total: 0
	})

	return <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorLocations" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
<XAxis dataKey="month" />
 <YAxis />
 <Tooltip/>
  <Area type="monotone" dataKey="locations" stroke="#8884d8" fillOpacity={1} fill="url(#colorLocations)" />
  <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTotal)" />
</AreaChart>
}



