const fs = require('node:fs');
const path = require('node:path');
module.exports = (client) => {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		try {
			const command = require(path.join('../../commands', file));
			client.commands.set(command.data.name, command);
		} catch (error) {
			client.logger.error(`Erreur lors du chargement du fichier de commande ${file} : ${error}`);
		}
	}
}