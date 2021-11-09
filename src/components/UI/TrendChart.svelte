<script>
	import * as Pancake from '@sveltejs/pancake';
  import Line from "svelte-chartjs/src/Line.svelte"
	import moment from 'moment';

  import { group, clean } from '../../lib/data-tools';

	export let rawRecords = [];

	$: cleanRecords = clean(rawRecords);

	$: days = group(cleanRecords, ({ date }) => date.toISOString()).map(
		(records) => {
			const locations = group(records, ({ location }) => location);
			return {
				date: records[0].date,
				dayOfYear: moment(records[0].date).dayOfYear(),
				x: moment(records[0].date).dayOfYear() + 1,
				month: moment(records[0].date).format('MMM'),
				dayOfMonth: Number(moment(records[0].date).format('D')),
				axisLabel: moment(records[0].date).format('MMM-D'),
				locations: locations.length,
				y: Math.round(
					locations
						.map((records) =>
							Math.max(...records.map(({ numberIndex }) => numberIndex))
						)
						.reduce((total, value) => total + value, 0)
				)

			};
		}
	);

	$: data = [...Array(365)].map((_, day) => {
		const realRecord = days.find(({ dayOfYear }) => dayOfYear === day + 1);
		if (realRecord) return realRecord;
		return {
			x: day + 1,
			y: 0,
			month: moment()
				.dayOfYear(day + 1)
				.format('MMM'),
			dayOfMonth: Number(
				moment()
					.dayOfYear(day + 1)
					.format('D')
			),
			axisLabel: moment()
				.dayOfYear(day + 1)
				.format('MMM-D'),
			locations: 0,
			total: 0
		};
	});

  $: yMax=Math.max(...data.map(({y}) =>y)) + 10

  $:chartJsData =  {
      labels: data.map(({dayOfMonth, month}, i) => dayOfMonth === 1 ? month : ''),
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Total',
          fill: false,    tension: 0.1,
    borderColor: 'rgb(255, 99, 132)',data: data.map(({y}) => y)} ]
    }

  const scales = {
    x: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }
  }
</script>

<Line
  data={chartJsData}
  width={100}
  height={50}
  scales={scales}
/>

<!-- options={{ maintainAspectRatio: false }} -->

<div class="chart">
	<Pancake.Chart x1={0} x2={365} y1={0} y2={yMax}>
		<Pancake.Box x2={10} y2={yMax}>
			<div class="axes" />
		</Pancake.Box>

		<Pancake.Grid vertical count={12} let:value>
			<span class="x label">{value}</span>
		</Pancake.Grid>

		<Pancake.Grid horizontal count={3} let:value>
			<span class="y label">{value}</span>
		</Pancake.Grid>

		<Pancake.Svg>
			<Pancake.SvgLine {data} let:d>
				<path class="data" {d} />
			</Pancake.SvgLine>
		</Pancake.Svg>
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 250px;
		padding: 3em 2em 2em 3em;
		box-sizing: border-box;
	}

	.axes {
		width: 100%;
		height: 100%;
		border-left: 1px solid black;
		border-bottom: 1px solid black;
	}

	.y.label {
		position: absolute;
		left: -2.5em;
		width: 2em;
		text-align: right;
		bottom: -0.5em;
	}

	.x.label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		text-align: center;
	}

	path.data {
		stroke: #8cf;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2px;
		fill: none;
	}
</style>
