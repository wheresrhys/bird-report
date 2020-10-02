require('sucrase/register/jsx');
const express = require('express')
const birds = require('./config/birds')
const {render} = require('./lib/render')
const {init: loadData, getRecords} = require('./data/load')
const {analyse} = require('./lib/analyse');
const app = express();

const { HomePage } = require('./templates/HomePage')
const { BirdPage } = require('./templates/BirdPage')

app.get('/', (req, res) => {
	res.send(render(HomePage, birds))
})

const getSpecies = async (theSpecies) => {
	const records = await getRecords(2018);
	return records.filter(({species}) => species === theSpecies)
}

app.get('/bird/:bird', async (req, res) => {
	const records = await getSpecies(req.params.bird);

	res.send(render(BirdPage, {
		// analysis: analyse(records, birds[req.params.bird]),
		records,
		distribution: birds[req.params.bird]
	}))
})

loadData().then(() => {
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

process.on('unhandledRejection', console.log)
