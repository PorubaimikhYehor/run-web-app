import { app, BrowserWindow, NativeImage } from 'electron';
import parseArgs from './parse-args';
import fetchIcon from './fetch-icon';
import * as path from 'path';
import { EventEmitter } from 'events';
import { TrayManager } from './tray-manager';
import { AppWindow } from './app-window';

let win: BrowserWindow | null;

// Parse command-line arguments
const args = parseArgs();
const url: string = args.url;

app.whenReady().then(async () => {
    const quitEventEmitter = new EventEmitter();
    win = new AppWindow(url, quitEventEmitter).create();
    const icon: string | NativeImage = args.icon || (await fetchIcon(url)) || path.join(__dirname, './assets/dark.png');
    new TrayManager(win, icon, quitEventEmitter).initialize();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (win && !win.isVisible()) win.show();
});
