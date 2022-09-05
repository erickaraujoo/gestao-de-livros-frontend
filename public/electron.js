const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'GNV SEGURO',
    width: 1040,
    height: 768,
    icon: path.resolve(__dirname, 'icon.ico'),
    backgroundColor: '#ffffff',
    show: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
    },
  });

  mainWindow.maximize();

  mainWindow.setMenu(null);

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
