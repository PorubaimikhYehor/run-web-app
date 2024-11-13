const { app } = require('electron');
const parseArgs = require('./parse-args');
const createWindow = require('./create-window');
const setupTray = require('./setup-tray');
const fetchIcon = require('./fetch-icon');
const path = require('path');
const EventEmitter = require('events');

let win;

// Parse command-line arguments
const args = parseArgs();
const url = args.url;

app.whenReady().then(async _ => {
  const quitEventEmitter = new EventEmitter();
  win = createWindow(url, quitEventEmitter);
  let icon = args.icon || await fetchIcon(url) || path.join(__dirname, '../assets/dark.png');
  setupTray(win, icon, quitEventEmitter);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win && !win.isVisible()) win.show();
});
