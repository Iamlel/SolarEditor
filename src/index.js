const {Menu, app, BrowserWindow} = require('electron');
const path = require('path');
const fetch = require('node-fetch');

async function getVersion() {
	const url = 'https://api.github.com/repos/Iamlel/ICE/releases/latest';
	const response = await fetch(url);
	const result = await response.json();
	return ((result.tag_name == undefined) ? "<Unknown>": result.tag_name);
}

const createNotepad = () => {
	const notepad = new BrowserWindow({	
		width: 720,
		height: 1020,
		icon: path.join(__dirname, '../', "temporary.ico"),
	});
	getVersion().then(x => { notepad.setTitle("ICE " + x); });
	notepad.loadFile(path.join(__dirname, "index.html"));
	createMenu(notepad);
}

const createEditor = () => {
	
}

const createMenu = notepad => {
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
				cehcked: false,
				role: 'togglefullscreen'
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
		},
		{
			label: 'Dev Tools',
			submenu : [
			]
		}
	]
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}
/*



*/
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
