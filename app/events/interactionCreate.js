const { Collection, EmbedBuilder, Events } = require('discord.js');
module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (command) {
			if (!interaction.client.cooldowns.has(command.data.name)) interaction.client.cooldowns.set(command.data.name, new Collection());
			const timestamps = interaction.client.cooldowns.get(command.data.name);
			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + command.cooldown;
				if (Date.now() < expirationTime) {
					await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`🕔 - Vous devez attendre **${Math.ceil((expirationTime - Date.now()) / 1000)} secondes** avant de pouvoir réutiliser la commande \`${command.data.name}\`.`)], ephemeral: true });
					return;
				}
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				interaction.client.logger.error(`Une erreur inattendue s'est produite lors de l'exécution de la commande ${command.data.name} par l'utilisateur ${interaction.user} : ${error}`);
				await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.danger).setDescription(`❌ - Une erreur inattendue s'est produite lors de l'exécution de votre commande.`)], ephemeral: true });
			} finally {
				timestamps.set(interaction.user.id, Date.now());
				setTimeout(() => timestamps.delete(interaction.user.id), command.cooldown);
			}
		} else {
			interaction.client.logger.warn(`${interaction.user} tente d'utiliser une commande inexistante ( ${interaction.commandName} ).`);
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.danger).setDescription(`❌ - La commande que vous souhaitez utiliser ne semble pas ou plus existé.`)], ephemeral: true });
		}
	},
};