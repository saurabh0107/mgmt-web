// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // if you have a preload.js file
      nodeIntegration: true, // allows Node.js in renderer process
      contextIsolation: false, // disable context isolation for easier integration
    },
  });

  // if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173'); // URL to Vite dev server
  // } else {
  //   mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html')); // Production build
  // }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
