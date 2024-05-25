const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('Envoie une réaction à un utilisateur.')
		.addSubcommand(subcommand => subcommand
			.setName('furry')
			.setDescription('Description de la première catégorie.')
			.addStringOption(option => option
				.setName('catégorie')
				.setDescription('Quelle catégorie de réaction souhaitez-vous ?')
				.setRequired(true)
				.addChoices(
					{ name: `Envoyer un boop`, value: 'boop' },
					{ name: `Envoyer un paquet`, value: 'bulge' },
					{ name: `Envoyer une caresse`, value: 'cuddle' },
					{ name: `Envoyer un hurlement`, value: 'howl' },
					{ name: `Envoyer un câlin`, value: 'hug' },
					{ name: `Envoyer un bisou`, value: 'kiss' },
					{ name: `Envoyer une léchouille`, value: 'lick' },
				)
			)
			.addUserOption(option => option
				.setName('utilisateur')
				.setDescription('À qui souhaitez-vous envoyer cette réaction ?')
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName('weeb')
			.setDescription('Description de la deuxième catégorie.')
			.addStringOption(option => option
				.setName('catégorie')
				.setDescription('Quelle catégorie de réaction souhaitez-vous ?')
				.setRequired(true)
				.addChoices(
					{ name: `Envoyer un "BAKA!"`, value: 'baka' },
					{ name: `Envoyer une morsure`, value: 'bite' },
					{ name: `Envoyer des pleurs`, value: 'cry' },
					{ name: `Envoyer une caresse`, value: 'cuddle' },
					{ name: `Envoyer une danse`, value: 'dance' },
					{ name: `Envoyer un facepalm`, value: 'facepalm' },
					{ name: `Envoyer de la nourriture`, value: 'feed' },
					{ name: `Envoyer un highfive`, value: 'highfive' },
					{ name: `Envoyer un câlin`, value: 'hug' },
					{ name: `Envoyer un coup`, value: 'kick' },
					{ name: `Envoyer un bisou`, value: 'kiss' },
					{ name: `Envoyer un rire`, value: 'laugh' },
					{ name: `Envoyer un nope`, value: 'nope' },
					{ name: `Envoyer un patpat`, value: 'pat' },
					{ name: `Envoyer un poke`, value: 'poke' },
					{ name: `Envoyer un coup de poing`, value: 'punch' },
					{ name: `Envoyer une gifle`, value: 'slap' },
					{ name: `Envoyer un sourire`, value: 'smile' },
					{ name: `Envoyer des chatouilles`, value: 'tickle' },
					{ name: `Envoyer un coucou`, value: 'wave' },
					{ name: `Envoyer un clin d'œil`, value: 'wink' },
				)
			)
			.addUserOption(option => option
				.setName('utilisateur')
				.setDescription('À qui souhaitez-vous envoyer cette réaction ?')
				.setRequired(true)
			)
		),
	cooldown: 3000,
	async execute(interaction) {
		const cmd = interaction.options.getSubcommand();
		const user = interaction.options.getUser('utilisateur');
		const choice = interaction.options.getString('catégorie');
		const categories = {
			'baka': `un "BAKA!"`,
			'bite': `une morsure`,
			'boop': `un boop`,
			'bulge': `un paquet`,
			'cry': `des pleurs`,
			'cuddle': `une caresse`,
			'dance': `une danse`,
			'facepalm': `un facepalm`,
			'feed': `de la nourriture`,
			'highfive': `un highfive`,
			'howl': `un hurlement`,
			'hug': `un câlin`,
			'kick': `un coup`,
			'kiss': `un bisou`,
			'laugh': `un rire`,
			'lick': `une léchouille`,
			'nope': `un nope`,
			'pat': `un patpat`,
			'poke': `un poke`,
			'punch': `un coup de poing`,
			'slap': `une gifle`,
			'smile': `un sourire`,
			'tickle': `des chatouilles`,
			'wave': `un coucou`,
			'wink': `clin d'œil`,
		}
		if (user.id === interaction.user.id) {
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`⚠️ - Vous ne pouvez pas vous faire ${categories[choice]} à vous-même ( ou alors, ce serait très bizarre ) ...`)], ephemeral: true });
			return;
		}
		if (user.id === interaction.client.user.id) {
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`✋ - Je ne vous permets pas !`)], ephemeral: true });
			return;
		}
		if (cmd === 'furry') {
			try {
				const response = await axios.get(`https://v2.yiff.rest/furry/${choice}?amount=1&notes=disabled`, { headers: { 'Authorization': `${interaction.client.settings.api.yiffy}`, 'User-Agent': 'Mitsuha Miyamizu/0.1.0 (mihoko_okayami; "Discord")' } });
				const { images } = response.data;
				const artist = images[0]?.artists?.[0] || null;
				const credits = artist ? `Artiste : ${artist}` : 'Inconnu';
				await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`${user}, vous avez reçu ${categories[choice]} de ${interaction.user}.`).setImage(images[0]['url']).setFooter({ text: credits })] });
			} catch {
				interaction.client.logger.warn(`Le service "https://v2.yiff.rest/furry/${choice}?amount=1&notes=disabled" ne répond pas.`);
				await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`⚠️ - Le service de recherche d'images semble indisponible pour le moment !`)], ephemeral: true });
			}
		}
		if (cmd === 'weeb') {
			try {
				const response = await axios.get(`https://nekos.best/api/v2/${choice}?amount=1`, { headers: { 'User-Agent': 'Mitsuha Miyamizu/0.1.0 (mihoko_okayami; "Discord")' } });
				const { results } = response.data;
				const artist = results[0]?.artist_name || null;
				const anime = results[0]?.anime_name || null;
				const credits = anime ? `Anime : ${anime}` : (artist ? `Artiste : ${artist}` : 'Inconnu');
				await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`${user}, vous avez reçu ${categories[choice]} de ${interaction.user}.`).setImage(results[0]['url']).setFooter({ text: credits })] });
			} catch {
				interaction.client.logger.warn(`Le service "https://nekos.best/api/v2/${choice}?amount=1" ne répond pas.`);
				await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`⚠️ - Le service de recherche d'images semble indisponible pour le moment !`)], ephemeral: true });
			}
		}
	},
};