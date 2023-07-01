const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Redémarre le bot.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	cooldown: 1000,
	async execute(interaction) {
		await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.danger).setDescription(`☢️ - Requête de redémarrage prise en compte !`)], ephemeral: true });
		await interaction.client.logger.info(`Redémarrage demandé par : ${interaction.user.tag}`);
		await interaction.client.destroy();
		process.exit(0);
	},
};