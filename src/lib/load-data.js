const XLSX = require('xlsx')
let records

const loadRecords = (file) => {
  const rawData = XLSX.readFile(file, {cellDates: true});
  const data = XLSX.utils.sheet_to_json(rawData.Sheets[rawData.SheetNames[0]]);


  records = data.map(row => ({
    species: row.SPECIES,
    location: row.Location,
    date: row['Date:D'],
    number: row.Number,
    numberIndex: row.NumberIndex,
    notes: row.Notes,
    recordingArea: row.RecordingArea,
    viceCounty: row.ViceCounty || row.Sector,
    observer: row.Observer,
    source: row.Source
  }));
}

// const loadGazetteer = () => readXlsxFile(__dirname + '/2018 Gazetteer v7.xlsx', {schema: {
// 	'Place': {
// 		prop: 'place',
// 		type: String
// 	},
// 	'Recording area': {
// 		prop: 'recordingArea',
// 		type: String
// 	},
// 	'Grid Ref': {
// 		prop: 'gridRef',
// 		type: String
// 	},
// 	"Kms from St. Paul'springPassage": {
// 		prop: 'kmsOut',
// 		type: String
// 	},
// 	"Miles from St Paul'springPassage": {
// 		prop: 'milesOut',
// 		type: String
// 	},
// 	'Borough': {
// 		prop: 'borough',
// 		type: String
// 	},
// }})
// 	.then(({rows}) => rows.reduce((gz, row) => ({...gz, [row.place]: row}), {}));

const init = (file) => Promise.all([
  // loadGazetteer(),
  loadRecords(file),
])

module.exports = {
  init,
  // getGazetteer = ,
  getRecords: () => records
}
