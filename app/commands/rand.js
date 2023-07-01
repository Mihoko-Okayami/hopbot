const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rand')
		.setDescription('Génère un nombre situé entre 1 et 100, ou entre 1 et le nombre que vous spécifiez.')
		.addNumberOption(option => option
			.setName('nombre')
			.setDescription('Vous souhaitez faire un rand sur une valeur précise ?')
			.setRequired(false)
		),
	cooldown: 3000,
	async execute(interaction) {
		const max = interaction.options.getNumber('nombre') ? Math.round(Math.abs(interaction.options.getNumber('nombre'))) : 100;
		const result = Math.floor(Math.random() * max) + 1;
		await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`🎲 - ${interaction.user} obtient un **${result}** (1-${max}).`)] });
	},
};