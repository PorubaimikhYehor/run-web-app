import { app, BrowserWindow } from 'electron';
import parseArgs from './parse-args';
import createWindow from './create-window';
import fetchIcon from './fetch-icon';
import * as path from 'path';
import { EventEmitter } from 'events';
import { TrayManager } from './tray-manager';


let win: BrowserWindow | null;

// Parse command-line arguments
const args = parseArgs();
const url: string = args.url;

app.whenReady().then(async () => {
    const quitEventEmitter = new EventEmitter();
    win = createWindow(url, quitEventEmitter);
    const icon: string | Electron.NativeImage = args.icon || (await fetchIcon(url)) || path.join(__dirname, './assets/dark.png');
    new TrayManager(win, icon, quitEventEmitter).initialize();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (win && !win.isVisible()) win.show();
});
