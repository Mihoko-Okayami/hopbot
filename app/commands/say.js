const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Envoie un message via le bot.')
		.addStringOption(option => option
			.setName('message')
			.setDescription('Que souhaitez-vous me faire dire ?')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	cooldown: 1000,
	async execute(interaction) {
		await interaction.reply(interaction.options.getString('message'));
	},
};