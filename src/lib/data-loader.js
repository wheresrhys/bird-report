import XLSX from 'xlsx';

/**
 * @typedef {Object} BirdRecord
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
 * @param {Uint8Array} buffer
 * @returns {BirdRecord[]}
 */
export function loadRecords (buffer) {
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

