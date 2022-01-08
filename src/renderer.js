electron = require('electron');
const { ipcRenderer } = require('electron');

window.addEventListener("DOMContentLoaded", () => {
	const ob = {
		showMenu: document.getElementById("showmenu"),
		mainText: {
			it: document.getElementById("mainText"),
			content: ''
		},
	}
	
	ipcRenderer.on('updateMenuBar', e => {
		ob.showMenu.style.visibility = "visible";
	})

	ob.showMenu.addEventListener("click", () => {
		ob.showMenu.style.visibility = "hidden";
		ipcRenderer.send('updateMenuBar');
	})
	
	ob.mainText.it.addEventListener("input", event => {
		ob.mainText.content = event.target.value;
	})
	
	ob.mainText.it.addEventListener("keydown", e => {
		if (event.key == 'Tab') {
			event.preventDefault();
			const start = e.target.selectionStart;
			const end = e.target.selectionEnd;
			
			e.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
			ob.mainText.content = event.target.value;
			e.target.selectionStart = e.target.selectionEnd = start + 1;
		}
		ob.mainText.content = event.target.value;
	})
})