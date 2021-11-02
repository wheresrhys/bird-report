import XLSX from 'xlsx';

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

const getSpeciesList = records => [...records.reduce((set, {species}) => set.add(species), new Set())]

export function importData  (buffer) {
  const records = loadRecords(buffer)
  return {
    records,
    speciesList: getSpeciesList(records)
  }
}
