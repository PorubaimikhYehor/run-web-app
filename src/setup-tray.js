const { Tray, Menu, BrowserWindow } = require('electron');
const EventEmitter = require('events');

/**
 * setup tray icon
 * @param {BrowserWindow} win electron browser window
 * @param {string | Electron.NativeImage} icon icon path or electron's NativeImage
 * @param {EventEmitter} quitEventEmitter "quit" event emitter 
 */
function setupTray(win, icon, quitEventEmitter) {
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        if (win && !win.isVisible()) win.show();
      },
    },
    {
      label: 'Quit',
      click: _ => quitEventEmitter.emit('quit'),
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('My Web App runner');
};

module.exports = setupTray;