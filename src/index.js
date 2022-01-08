const electron = require('electron');
const { Menu, app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let notepad;

async function getNewVersion() {
	const url = 'https://api.github.com/repos/Iamlel/ICE/releases/latest';
	const response = await fetch(url);
	const result = await response.json();
	return ((result.tag_name == undefined) ? "<Unknown>": result.tag_name);
}

const output = () => {
	notepad.setMenuBarVisibility(false)
}

const createNotepad = () => {
	notepad = new BrowserWindow({	
		width: 720,
		height: 1020,
		icon: path.join(__dirname, '../', "temporary.ico"),
		webPreferences: {
			preload: path.join(__dirname, "renderer.js"),
		}
	});
	notepad.loadFile(path.join(__dirname, "index.html"));
	createMenu();
}

const createEditor = () => {
}

const createMenu = () => {
	const template = [
		{
			label: 'File',
			submenu: [
			{ label: 'New' },
			{ label: 'Open…' },
			{ type: 'separator' },
			{ label: 'Save' },
			{ label: 'Save As…' },
			{ label: 'Save a Copy As…' },
			{ label: 'Save All' },
			{ label: 'Rename…' },
			{ type: 'separator' },
			{ role: 'quit' }
			]
		},
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
			label: "Tools",
			submenu: [
			{ label: 'Console' },
			{ label: 'Explorer' }
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
			{
				label: 'about',
				click: function() { }
				
			},
			]
		},
		{
			label: 'Dev Tools',
			submenu: [
			{ label: 'Dev Tool', click: function() { notepad.webContents.openDevTools(); } },
			{ label: 'Refresh', click: function() { notepad.reload() } },
			{ label: 'Test', click: function() { notepad.webContents.send('test', 'test') } }
			]
		}
	]
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

app.on('ready', function() {
	createNotepad();
	createEditor();
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