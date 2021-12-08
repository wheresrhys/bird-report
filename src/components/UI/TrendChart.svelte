<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { Chart, registerables  } from 'chart.js';
  import moment from 'moment';
  import 'chartjs-adapter-moment';

	import { group, clean } from '../../lib/data-tools';
  import {year} from '../../lib/stores'
	export let rawRecords = [];

	Chart.register(...registerables);

	$: cleanRecords = clean(rawRecords);

  console.log(year)
	$: days = group(cleanRecords, ({ date }) => date.toISOString()).map(
		(records, i) => {
			const locations = group(records, ({ location }) => location);

			return {
				date: records[0].date.toISOString(),
				dayOfYear: moment(records[0].date).dayOfYear(),
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
      dayOfYear: day + 1,
      date: moment().year($year).dayOfYear(day + 1).startOf('day'),
			axisLabel: moment()
				.dayOfYear(day + 1)
				.format('MMM-D'),
			locations: 0,
			total: 0
		};
	});

	$: yMax = Math.max(...data.map(({ y }) => y)) + 10;

	$: chartJsData = {
		datasets: [
			{
				label: 'locations',
				fill: false,
				tension: 0.2,
				borderColor: '#8884d8',
				data: data.map(({ locations, date }) => ({x: date, y: locations}))
			},
			{
				label: 'total',
				fill: false,
				tension: 0.2,
				borderColor: '#82ca9d',
        data: data.map(({ total, date }) => ({x: date, y: total}))
			}
		],

	};

	const options = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: false,
    pointHitRadius: 4,
    pointRadius: 1,
    scales: {
      x: {
        min: moment().year($year).dayOfYear(1).startOf('day'),
        max: moment().year($year).dayOfYear(365).startOf('day'),
        type: 'time',
        gridLines: {
          display:true
        },
        time: {
          unit: 'month'
        },
        distribution: 'linear'
      }
    }
  };
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
		chart.type = 'line';
		chart.options = options;
		chart.update();
	});

	onDestroy(() => {
		chart = null;
	});
</script>
<div  class="trend-chart">
<canvas bind:this={chartRef} />
</div>

<style>
  .trend-chart {
    height: 200px;
    position:  relative;
  }
</style>
