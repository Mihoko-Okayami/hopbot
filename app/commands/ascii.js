const { SlashCommandBuilder } = require('discord.js');
const figlet = require('figlet');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('Transforme un message en ASCII.')
		.addStringOption(option => option
			.setName('message')
			.setDescription('Quel message souhaitez-vous transformer en ASCII ?')
			.setRequired(true)
		),
	cooldown: 3000,
	async execute(interaction) {
		const msg = interaction.options.getString('message');
		if (msg.length > 24) {
			await interaction.reply({ content: `⚠️ - Afin que le résultat ASCII s\'affiche correctement dans Discord, vous ne devez pas dépasser **24 caractères** ( actuellement : **${msg.length}** ).`, ephemeral: true });
			return;
		}
		try {
			const ascii = await new Promise((resolve, reject) => {
				figlet.text(msg, (error, data) => {
					if (error) reject(error);
					else resolve(data);
				});
			});
			await interaction.reply(`${interaction.user}, voici votre message en ASCII :\n\`\`\`${ascii}\`\`\``);
		} catch (error) {
			interaction.client.logger.error(`Le module "figlet" retourne une erreur sur le message : ${msg}`);
			await interaction.reply({ content: `❌ - Le module de transformation ASCII semble être en erreur !`, ephemeral: true });
		}
	},
};