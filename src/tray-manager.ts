import { Tray, Menu, BrowserWindow, NativeImage } from 'electron';
import { EventEmitter } from 'events';

export class TrayManager {
  private tray: Tray;
  private quitEventEmitter: EventEmitter;

  /**
   * Constructor for the TrayManager class
   * @param win The Electron BrowserWindow instance
   * @param icon The path to the tray icon or a NativeImage instance
   * @param quitEventEmitter An EventEmitter for the "quit" event
   */
  constructor(
    private win: BrowserWindow,
    icon: string | NativeImage,
    quitEventEmitter: EventEmitter
  ) {
    this.tray = new Tray(icon);
    this.quitEventEmitter = quitEventEmitter;
  }

  /**
   * Initialize the tray menu and its behavior
   */
  public initialize(): void {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        click: () => this.handleOpen(),
      },
      {
        label: 'Quit',
        click: () => this.handleQuit(),
      },
    ]);
    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip('My Web App runner');
  }

  /**
   * Handle the "Open" action from the tray menu
   */
  private handleOpen(): void {
    if (this.win && !this.win.isVisible()) {
      this.win.show();
    } else {
      this.win.focus();
    }
  }

  /**
   * Handle the "Quit" action from the tray menu
   */
  private handleQuit(): void {
    this.quitEventEmitter.emit('quit');
  }
}
