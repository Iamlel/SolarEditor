const electron = require('electron');
const { Menu, app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let notepad;

const output = () => {
	notepad.setMenuBarVisibility(false)
}

const createNotepad = () => {
	notepad = new BrowserWindow({	
		width: 720,
		height: 1020,
		webPreferences: {
			preload: path.join(__dirname, "renderer.js"),
		}
	});
	notepad.loadFile(path.join(__dirname, "index.html"));
	createMenu();
}

const createMenu = () => {
	const template = [
		{
			label: 'Edit',
			submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			{ role: 'delete' },
			{ role: 'selectall' }
			]
		},
		{
			label: 'View',
			submenu: [
			{
				type: 'checkbox',
				checked: false,
				label: 'Always on Top',
				click: function() { 
				notepad.setAlwaysOnTop(!notepad.isAlwaysOnTop(), 'screen'); 
				}
			},
			{
				type: 'checkbox',
				checked: false,
				role: 'togglefullscreen'
			},
			{
				label: 'Hide Menubar',
				click: function() {
					notepad.setMenuBarVisibility(false);
					notepad.webContents.send('updateMenuBar')
				}
			},
			{
				type: 'separator',
			},
			{
				label: 'Zoom',
				submenu: [
				{ role: 'zoomIn' },
				{ role: 'zoomOut' },
				{ role: 'resetZoom' },
				]
			},
			]
		},
		{
			label: 'Help',
			submenu: [
			{
				label: 'Open Github',
				click: function() { electron.shell.openExternal('https://github.com/Iamlel/ICE') }
			},
			]
		}
	]
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

app.on('ready', function() {
	createNotepad();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});


app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length == 0) {
		createWindow();
	}
});

ipcMain.on('updateMenuBar', () => { notepad.setMenuBarVisibility(true); })
