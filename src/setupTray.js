const { Tray, Menu } = require('electron');

module.exports = function setupTray(win, iconPath, quitCallback) {
  console.log(iconPath);
  const tray = new Tray(iconPath);  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        if (win && !win.isVisible()) win.show();
      },
    },
    {
      label: 'Quit',
      click: quitCallback,  // Calls the `quitCallback` to set `isQuitting` and quit the app
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('My Web App');

  return tray;
};
