const {Menu, app, BrowserWindow} = require('electron')
const path = require('path')

const createNotepad = () => {
	const notepad = new BrowserWindow({	
		width: 1420,
		height: 1020,
		icon: path.join(__dirname, '../', "temporary.ico"),
	});
	notepad.loadFile(path.join(__dirname, "index.html"));
	createMenu(notepad);
}

const createEditor = () => {
	//const fileEditor = new BrowserWindow({ width: 700, height: 700, });
}

const createMenu = (notepad) => {
	const template = [
		{
			label: 'File',
			submenu: [
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
			{ role: 'pasteandmatchstyle' },
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
//
//function createWindow () {
//  // Create the browser window.
//  const mainWindow = new BrowserWindow({
//    width: 800,
//    height: 600,
//    webPreferences: {
//      preload: path.join(__dirname, 'preload.js')
//    }
//  })
//
//  // and load the index.html of the app.
//  mainWindow.loadFile('./index.html')
//
//  // Open the DevTools.
//  // mainWindow.webContents.openDevTools()
//}
//
//// This method will be called when Electron has finished
//// initialization and is ready to create browser windows.
//// Some APIs can only be used after this event occurs.
//app.whenReady().then(() => {
//  createWindow()
//
//  app.on('activate', function () {
//    // On macOS it's common to re-create a window in the app when the
//    // dock icon is clicked and there are no other windows open.
//    if (BrowserWindow.getAllWindows().length === 0) createWindow()
//  })
//})
//
//// Quit when all windows are closed, except on macOS. There, it's common
//// for applications and their menu bar to stay active until the user quits
//// explicitly with Cmd + Q.
//app.on('window-all-closed', function () {
//  if (process.platform !== 'darwin') app.quit()
//})
//
//// In this file you can include the rest of your app's specific main process
//// code. You can also put them in separate files and require them here.
//