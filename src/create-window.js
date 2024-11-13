const { BrowserWindow } = require('electron');
const EventEmitter = require('events');
const path = require('path');

/**
 * create app window
 * @param {string} url web page url
 * @param {EventEmitter} quitEventEmitter "quit" event emitter
 * @returns {BrowserWindow} app window
 */
function createWindow(url, quitEventEmitter) {
  let isQuitting = false;
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL(url);
  win.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });
  quitEventEmitter.on('quit', _ => {
    isQuitting = true;
    win.close();
  });
  return win;
};

module.exports = createWindow;
