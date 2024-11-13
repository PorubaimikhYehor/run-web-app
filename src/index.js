const { app } = require('electron');
const parseArgs = require('./parseArgs');
const createWindow = require('./createWindow');
const setupTray = require('./setupTray');
const fetchIcon = require('./fetchIcon');
const path = require('path');

let tray;
let win;
let isQuitting = false;  // Shared quitting flag

// Parse command-line arguments
const args = parseArgs();
const url = args.url;

app.whenReady().then(async () => {
  win = createWindow(url, () => isQuitting);  // Pass a callback to check `isQuitting` dynamically
  let icon = args.icon || await fetchIcon(url) || path.join(__dirname, '../assets/dark.png');
  tray = setupTray(win, icon, () => {
    isQuitting = true;
    app.quit();
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win && !win.isVisible()) win.show();
});
