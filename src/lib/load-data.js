

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

// module.exports = {
//   init,
//   // getGazetteer = ,
//   getRecords: () => records
// }
