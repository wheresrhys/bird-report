<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import moment from 'moment';
	import 'chartjs-adapter-moment';

	import { group, clean } from '../../lib/data-tools';
	import { year } from '../../lib/stores';

	/** @typedef {import('../../lib/data-tools').Record} Record */
	/** @typedef {import('moment').Moment} Moment */

	/** @type {Record[]} */
	export let rawRecords = [];

	Chart.register(...registerables);

	/**
	 * @typedef DaySummary
	 * @property {number} dayOfYear
	 * @property {string | Moment} date
	 * @property {number} locations
	 * @property {number} total
	 */

	/**
	 * @param {Record[]} records
	 * @return {DaySummary}
	 */
	function createDaySummary(records) {
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

	/**
	 * @param {number} day
	 * @returns {DaySummary}
	 */
	function createZeroDay(day) {
		return {
			dayOfYear: day + 1,
			date: moment()
				.year($year)
				.dayOfYear(day + 1)
				.startOf('day'),
			locations: 0,
			total: 0
		};
	}

	/** @type {Record[]} */
	$: cleanRecords = clean(rawRecords);

	/** @type {DaySummary[]} */
	$: days = group(cleanRecords, ({ date }) => date.toDateString()).map(
		createDaySummary
	);

	/** @type {DaySummary[]} */
	$: daysIncludingZeroes = [...Array(365)].map(
		(_, day) =>
			days.find(({ dayOfYear }) => dayOfYear === day + 1) || createZeroDay(day)
	);

	/** @type { import("chart.js").ChartData }  */
	$: chartJsData = {
		datasets: [
			{
				label: 'locations',
				fill: false,
				tension: 0.2,
				borderColor: '#8884d8',
				data: daysIncludingZeroes.map(({ locations, date }) => ({
					x: date,
					y: locations
				}))
			},
			{
				label: 'total',
				fill: false,
				tension: 0.2,
				borderColor: '#82ca9d',
				data: daysIncludingZeroes.map(({ total, date }) => ({
					x: date,
					y: total
				}))
			}
		]
	};


	/** @typedef { import("chart.js").ChartOptions} ChartOptions */
	/** @typedef { import("chart.js").LineControllerDatasetOptions} LineControllerDatasetOptions */

	/** @type { ChartOptions}  */
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		pointHitRadius: 4,
		pointRadius: 1,
		scales: {
			x: {
				min: Number(moment().year($year).dayOfYear(1).startOf('day')),
				max: Number(moment().year($year).dayOfYear(365).startOf('day')),
				type: 'time',
				time: {
					unit: 'month'
				}
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
		chart.update();
	});

	onDestroy(() => {
		chart = null;
	});
</script>

<div class="trend-chart">
	<canvas bind:this={chartRef} />
</div>

<style>
	.trend-chart {
		height: 200px;
		position: relative;
	}
</style>
