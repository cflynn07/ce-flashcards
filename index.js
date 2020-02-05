const {
  BrowserWindow,
  app,
  ipcMain
} = require('electron')
const path = require('path')
// const url = require('url')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'ce_dict.sqlite3')
  }
})

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')

  ipcMain.on('DOMContentLoaded', (e) => {
    console.log('on-DOMContentLoaded')
    knex.select('id', 'simplified', 'traditional')
      .from('dict')
      .limit(100)
      .offset(3000)
      .then((rows) => {
        win.webContents.send('sqlite3data', rows)
      })
  })
}

// app.on('ready', createWindow)
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  console.log('test?')
  app.quit()
})
