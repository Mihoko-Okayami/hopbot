const fs = require('node:fs');
const path = require('node:path');
module.exports = (client) => {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		try {
			const event = require(path.join('../../events', file));
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		} catch (error) {
			client.logger.error(`Erreur lors du chargement du fichier d'événement ${file} : ${error}`);
		}
	}
	process.on('SIGINT', () => {
		client.destroy();
		process.exit();
	});
}