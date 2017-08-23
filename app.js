const {
    app,
    BrowserWindow,
    Menu
} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		title: 'rss-reader'
	});

  mainWindow.loadURL(url.format({
    'pathname': path.join(__dirname, 'dist', 'index.html'),
    'protocol': 'file:',
    'slashes': true
  }));
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
