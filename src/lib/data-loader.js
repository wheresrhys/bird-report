import XLSX from 'xlsx';

/**
 * @typedef {Object} Record
 * @property {string} species
 * @property {string} location
 * @property {Date} date
 * @property {number} number
 * @property {number} numberIndex
 * @property {string} notes
 * @property {string} recordingArea
 * @property {string} viceCounty
 * @property {string} observer
 * @property {string} source
 */

/**
 * @typedef {Object} RecordsUpload
 * @property {string[]} speciesList
 * @property {Record[]} records
 */

/**
 * @param {Uint8Array} buffer
 * @returns {Record[]}
 */
const loadRecords = (buffer) => {
  const rawData = XLSX.read(buffer, {cellDates: true, type: 'array'});
  const data = XLSX.utils.sheet_to_json(rawData.Sheets[rawData.SheetNames[0]]);

  return data.map(row => ({
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


/**
 * @param {Record[]} records
 * @returns {string[]}
 */
const getSpeciesList = records => [...records.reduce((set, {species}) => set.add(species), new Set())]


/**
 * @param {Uint8Array} buffer
 * @returns RecordsUpload
 */
export function importData  (buffer) {
  const records = loadRecords(buffer)
  return {
    records,
    speciesList: getSpeciesList(records)
  }
}
