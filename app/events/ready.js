const { Events } = require('discord.js');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		try {
			const guild = await client.guilds.cache.get(client.settings.bot.guilde);
			await guild.commands.set(client.commands.map(command => command.data));
			client.user.setActivity(`${client.settings.bot.status}`, { type: 'WATCHING' });
			client.logger.info(`${client.user.tag} en service <3 !`);
		} catch (error) {
			client.logger.error(`Erreur lors de la définition des commandes pour le serveur ${client.settings.bot.guilde} : ${error}`);
		}
	},
};