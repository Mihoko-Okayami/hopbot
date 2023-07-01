const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Affiche une blague (pas forcément très marrante).')
		.addStringOption(option => option
			.setName('catégorie')
			.setDescription('Quelle catégorie de blague souhaitez-vous ?')
			.setRequired(true)
			.addChoices(
				{ name: 'Humour basique', value: 'global' },
				{ name: 'Humour de développeurs', value: 'dev' },
				{ name: 'Humour noir', value: 'dark' },
				{ name: 'Humour "limite limite"', value: 'limit' },
				{ name: 'Humour de beaufs', value: 'beauf' },
				{ name: 'Humour sur les blondes', value: 'blondes' },
			)
		),
	cooldown: 3000,
	async execute(interaction) {
		if (!interaction.client.settings.api.blagues) return;
		const type = interaction.options.getString('catégorie');
		try {
			const response = await axios.get(`https://www.blagues-api.fr/api/type/${type}/random`, { headers: { 'Authorization': `Bearer ${interaction.client.settings.api.blagues}`, 'User-Agent': 'Mitsuha Miyamizu/0.1.0 (Mihoko Okayami#0579; "Discord")' } });
			const joke = response.data;
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`Voici votre blague ${interaction.user} :`).addFields({ name: joke['joke'], value: `Réponse : || ${joke['answer']} ||` }).setFooter({ text: `Catégorie : ${joke['type']}` })] });
		} catch (error) {
			interaction.client.logger.warn(`Le service "https://www.blagues-api.fr/api/type/${type}/random" ne répond pas.`);
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription('⚠️ - Le service de recherche de blagues semble indisponible pour le moment !')], ephemeral: true });
		}
	},
};