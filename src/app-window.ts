import { BrowserWindowConstructorOptions, Event } from "electron";
import { EventEmitter } from 'events';
import { BrowserWindow } from 'electron';

export class AppWindow {
  private window: BrowserWindow;
  private isQuitting: boolean = false;
  private url: string;
  private quitEventEmitter: EventEmitter;
  /**
   * Initializes the AppWindow.
   * @param {string} url - The web page URL to load.
   * @param {EventEmitter} quitEventEmitter - EventEmitter for handling the "quit" event.
   */
  constructor(url: string, quitEventEmitter: EventEmitter) {
    this.url = url;
    this.quitEventEmitter = quitEventEmitter;
  }

  /**
   * 
   * @param {BrowserWindowConstructorOptions} options The application window optopns
   * @returns {BrowserWindow} The BrowserWindow instance.
   */
  public create(options?: BrowserWindowConstructorOptions): BrowserWindow {
    const defaultOprtions = {
      width: 1024,
      height: 768,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
      },
    }
    this.window = new BrowserWindow(Object.assign(defaultOprtions, options));

    this.window.loadURL(this.url);

    this.window.on('close', (event: Event) => {
      if (!this.isQuitting) {
        event.preventDefault();
        this.window.hide();
      }
    });

    this.quitEventEmitter.on('quit', () => {
      this.isQuitting = true;
      this.window.close();
    });
    return this.window;
  }
}