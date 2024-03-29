'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

function main() {

  // create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 800,
    height: 600,
  })

  // enable dev tools
  //mainWindow.webContents.openDevTools();

  // load app/index.html as the window content
  mainWindow.loadUrl(path.join('file://', 'app', 'index.html'));
}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});