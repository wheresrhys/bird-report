const readXlsxFile = require('read-excel-file/node')

let records

const loadRecords = (file) => readXlsxFile(file, {
  schema: {
    SPECIES: {
      prop: 'species',
      type: String,
    },
    Location: {
      prop: 'location',
      type: String,
    },
    'Date:D': {
      prop: 'date',
      type: Date,
    },
    Number: {
      prop: 'number',
      type: Number,
    },
    NumberIndex: {
      prop: 'numberIndex',
      type: Number,
    },
    Notes: {
      prop: 'notes',
      type: String,
    },
    RecordingArea: {
      prop: 'recordingArea',
      type: String,
    },
    ViceCounty: {
      prop: 'viceCounty',
      type: String,
    },
  },
}).then(({ rows }) => (records = rows))

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
