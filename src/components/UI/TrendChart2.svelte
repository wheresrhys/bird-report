<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { Chart, registerables } from 'chart.js/dist/chart.esm';
	import moment from 'moment';
	import { group, clean } from '../../lib/data-tools';
	export let rawRecords = [];

	Chart.register(...registerables);

	$: cleanRecords = clean(rawRecords);

	$: days = group(cleanRecords, ({ date }) => date.toISOString()).map(
		(records) => {
			const locations = group(records, ({ location }) => location);
			return {
				date: records[0].date,
				dayOfYear: moment(records[0].date).dayOfYear(),
				x: records[0].date,//moment(records[0].date).dayOfYear() + 1,
				month: moment(records[0].date).format('MMM'),
				dayOfMonth: Number(moment(records[0].date).format('D')),
				axisLabel: moment(records[0].date).format('MMM-D'),
				locations: locations.length,
				total: Math.round(
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

	$: yMax = Math.max(...data.map(({ y }) => y)) + 10;

	$: chartJsData = {
		labels: data.map(({ dayOfMonth, month }, i) =>
			dayOfMonth === 1 ? month : ''
		),
		datasets: [
			{
				label: 'locations',
				fill: false,
				tension: 0.3,
				borderColor: '#8884d8',
				data: data.map(({ locations }) => locations)
			},
			{
				label: 'total',
				fill: false,
				tension: 0.3,
				borderColor: '#82ca9d',
				data: data.map(({ total }) => total)
			}
		],

	};

	const scales = {
		x: {
			ticks: {
				// Include a dollar sign in the ticks
				callback: function (value, index, values) {
					return '$' + value;
				}
			}
		}
	};

	//  Expected data
	export let data = {
		labels: [],
		datasets: [{ data: [] }],
		yMarkers: {},
		yRegions: []
	};
	export let type = 'line';
	export let options = {scales: {
  xAxes: [{
    type: 'time',
    time: {
      unit: 'month'
    }
  }],
}};
	let chart = null;
	let chartRef;
	onMount(() => {
		chart = new Chart(chartRef, {
			type: 'line',
			data: chartJsData,
			options
		});
	});
	afterUpdate(() => {
		if (!chart) return;

		chart.data = chartJsData;
		chart.type = type;
		chart.options = options;
		chart.update();
	});

	onDestroy(() => {
		chart = null;
	});
</script>

<canvas bind:this={chartRef} />
