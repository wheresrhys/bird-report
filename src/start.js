const { app, BrowserWindow, ipcMain } = require('electron')
const {init: loadData, getRecords} = require('./data/load')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.webContents.openDevTools()

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => loadData().then(createWindow))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


const getSpecies = async (theSpecies) => {
  const records = await getRecords(2018);
  return records.filter(({species}) => species === theSpecies)
}

ipcMain.handle('get-bird', async (event, {bird}) => {

  console.log({bird})
  // ... do something on behalf of the renderer ...
  return getSpecies(bird)
})
