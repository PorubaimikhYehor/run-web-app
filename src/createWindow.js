const { BrowserWindow } = require('electron');

module.exports = function createWindow(url, isQuittingCallback) {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL(url);

  // Hide window on close instead of quitting if `isQuittingCallback` returns false
  win.on('close', (event) => {
    if (!isQuittingCallback()) {
      event.preventDefault();
      win.hide();
    }
  });

  return win;
};
