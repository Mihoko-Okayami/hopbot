const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Affiche le ping du bot.'),
	cooldown: 3000,
	async execute(interaction) {
		await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`📶 - Mon ping est actuellement de **${interaction.client.ws.ping}ms**.`)], ephemeral: true });
	},
};