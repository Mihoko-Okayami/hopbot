const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Affiche l\'uptime du bot.'),
	cooldown: 3000,
	async execute(interaction) {
		const milliseconds = interaction.client.uptime;
		const days = Math.floor(milliseconds / 86400000);
		const hours = Math.floor((milliseconds % 86400000) / 3600000);
		const minutes = Math.floor((milliseconds % 3600000) / 60000);
		let duration = '';
		if (milliseconds < 60000) {
			duration += `moins d'une minute`;
		} else {
			if (days > 0) {
				duration += days + ' jour' + (days > 1 ? 's' : '') + ', ';
			}
			if (days > 0 || hours > 0) {
				duration += hours + ' heure' + (hours > 1 ? 's' : '') + ' et ';
			}
			duration += minutes + ' minute' + (minutes > 1 ? 's' : '');
		}
		await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`⏱ - Je suis en ligne depuis **${duration}**.`)], ephemeral: true });
	},
};