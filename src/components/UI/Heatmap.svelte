<script>
	import { group, sortPropAsc } from '../../lib/data-tools';
 	import moment from 'moment';
	/** @type {import('../../lib/data-tools').Record[]} */
	export let records = [];

	const oneDay = 1000*60*60*24;
	const getNumberOrOne = (rx, str) => {
		const result = rx.exec(str);
		if (!result) {
			return 0
		}
		return result[1] ? parseInt(result[1]) : 1;
	}

const getSexes = record => {
	if (!record.records) {
		if (record.location === "Queen Mother Reservoir") {
			console.log(record)
		}
		let maleCount = 0
		let femaleCount = 0
		let unknownCount = Math.round(record.numberIndex)
		if (record.notes) {
			maleCount = countMale(record)
			femaleCount = countFemale(record)
			if (maleCount + femaleCount > unknownCount) {
				maleCount = femaleCount = 0;
			}
			unknownCount = Math.max(Math.round(record.numberIndex - (maleCount + femaleCount)), 0)
		}
		const result = {maleCount, femaleCount, unknownCount: Math.floor(unknownCount), notes: record.notes}

		if (/territories|nominal|breeding|juv|singing/.test(record.notes)) {
			result.isBreedingRecord = true
		}
		return result;
	} else {
		const details = record.records
			.map(getSexes)

		const result = {
			maleCount: Math.max(...details.map(({maleCount}) => maleCount)),
			femaleCount: Math.max(...details.map(({femaleCount}) => femaleCount)),
		}
		result.unknownCount = Math.max(Math.round(record.numberIndex - (result.maleCount + result.femaleCount)), 0)
		result.notes = details.map(({notes}) => notes).filter(notes => !!notes).map(notes => `- ${notes}`).join('\n')
		result.isBreedingRecord = details.reduce((agg, {isBreedingRecord}) => agg || isBreedingRecord, false)
		return result
	}
}

	// only allow numbers max 2 digits long bekause otherwise get into peopel saying something is e.g. 200m away
	const maleRX = /(?:\b|^|\()(?:(\d{1,2})\s*)?((adult|ad\.)\s+)?(m\.?|males?)(\b|$)/i
	const femaleRX = /(?:\b|^|\()(?:(\d{1,2})\s*)?((adult|ad\.)\s+)?(f\.?|fems?|females?)(\b|$)/i
	const countMale = record => getNumberOrOne(maleRX, record.notes)
	const countFemale = record => getNumberOrOne(femaleRX, record.notes)
	const generateHeatmap = records => records.map((record, i) => {
			const stats = getSexes(record);
			const nextRecord = records[i + 1];
			let daysUntilNextRecord = 0;
			if (nextRecord) {
				daysUntilNextRecord = Math.round((moment(records[i+1].date).startOf('day') - moment(record.date).startOf('day'))/oneDay);
			}
			return {...stats, spacers: [...Array(daysUntilNextRecord)], date: record.date }
	})

	$: heatmap = generateHeatmap(records)
	$: firstDay = moment(records[0].date).format('dddd').toLowerCase()

</script>

<div class={`heatmap ${firstDay}`}>
	{#each heatmap as {isBreedingRecord, maleCount, femaleCount, unknownCount, spacers, isSaturday, date}}
		<div class="heatmap__day" class:is-breeding={isBreedingRecord}>
			<span class="date">{moment(date).format('D/M')}</span>
			{#each [...Array(maleCount)] as record}<span class="heatmap__record male"></span>{/each}
			{#each [...Array(femaleCount)] as record}<span class="heatmap__record female"></span>{/each}
			{#each [...Array(unknownCount)] as record}<span class="heatmap__record unknown"></span>{/each}
		</div>
			{#each spacers as spacer}
				<div class="heatmap__spacer"></div>
			{/each}
	{/each}
</div>

<style>
		.date {
			font-size: 9px;
			writing-mode: vertical-rl;
			text-orientation: mixed;
		}
		.heatmap.monday > :nth-child(7n+3),
		.heatmap.monday > :nth-child(7n+4) {
			background: rgba(255, 200, 0, 0.3)
		}
		.heatmap.tuesday > :nth-child(7n+4),
		.heatmap.tuesday > :nth-child(7n+5) {
			background: rgba(255, 200, 0, 0.3)
		}
		.heatmap.wednesday > :nth-child(7n+5),
		.heatmap.wednesday > :nth-child(7n+6) {
			background: rgba(255, 200, 0, 0.3)
		}
		.heatmap.thursday > :nth-child(7n+6),
		.heatmap.thursday > :nth-child(7n+7) {
			background: rgba(255, 200, 0, 0.3)
		}
		.heatmap.friday > :nth-child(7n),
		.heatmap.friday > :nth-child(7n+1) {
			background: rgba(255, 200, 0, 0.3)
		}
		.heatmap.saturday > :nth-child(7n+1),
		.heatmap.saturday > :nth-child(7n+2) {
			background: rgba(255, 200, 0, 0.3)
		}
		.heatmap.sunday > :nth-child(7n+2),
		.heatmap.sunday > :nth-child(7n+3) {
			background: rgba(255, 200, 0, 0.3)
		}

		.heatmap {
			display: flex;
		}
		.heatmap__spacer {
			width: 7px;
			border-right: 1px solid black;
		}

		.heatmap__day {
			border-right: 1px solid black;
		}

		.heatmap__day.is-breeding {
			background: rgba(255, 0, 0, 0.4) !important;
		}

		.heatmap__record {
			display: block;
			height: 7px;
			margin: 2px;
		}
		.heatmap__record  {
			width: 7px;
			height: 7px;
			display: block;
			border-radius: 7px;
			text-indent: -5000px;
		}

		.male {
			background: red;
		}

		.female {
			background: green;
		}

		.unknown {
			background: gray;
		}


</style>
