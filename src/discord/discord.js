const rpc = require("discord-rpc");
const client = new rpc.Client({
	transport: "ipc"
})

const image = 'typescript';

client.on('ready', () => {
	client.setActivity({
		//details: '{Custom Status}',
		//state: '{Working on _ file}',
		startTimestamp: new Date(),
		largeImageKey: image,
		largeImageText: `Working on ${cap(image)}`,
		smallImageKey: 'small',
		smallImageText: 'v0.1.0',
	})
})

client.login({
	clientId: '737880733548412929',
})

const cap = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}