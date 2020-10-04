const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const {init: loadData, getRecords} = require('./lib/load-data')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.maximize()
  // mainWindow.webContents.openDevTools()




dialog.showOpenDialog(mainWindow, {
  title: 'Select an excel file of bird records',
  properties: ['openFile']
}).then(async files => {
  await loadData(files.filePaths[0]);
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  )
})

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

ipcMain.handle('get-bird', async (event, {bird}) =>  getRecords()
  .filter(({species}) => species === bird)
  )
