const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('love')
		.setDescription('Calcul votre pourcentage de compatibilité amoureuse avec un utilisateur.')
		.addUserOption((option) => option
			.setName('utilisateur')
			.setDescription('Avec qui souhaitez-vous calculer votre compatibilité amoureuse ?')
			.setRequired(true)
		),
	cooldown: 3000,
	async execute(interaction) {
		const user = interaction.options.getUser('utilisateur');
		if (user.id === interaction.user.id) {
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`⚠️ - Vous ne pouvez pas calculer votre compatibilité amoureuse avec vous-même ( ou alors, ce serait très bizarre ) ...`)], ephemeral: true });
			return;
		}
		if (user.id === interaction.client.user.id) {
			await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.warning).setDescription(`✋ - Je ne vous permets pas !`)], ephemeral: true });
			return;
		}
		const compatibility = (BigInt(interaction.user.id) ^ BigInt(user.id)) % 101n;
		const comment =
			compatibility < 10 ? "C'est presque comme si Cupidon avait fermé les yeux..."
				: compatibility < 20 ? "Les opposés s'attirent, mais là, c'est peut-être un peu trop opposé..."
				: compatibility < 30 ? "Hmm, ça pourrait être pire..."
				: compatibility < 40 ? "Peut-être que le destin vous réserve quelque chose, mais pour l'instant, c'est un peu flou."
				: compatibility < 50 ? "C'est la moitié du chemin vers le succès ou la moitié vers la catastrophe. À vous de choisir !"
				: compatibility < 60 ? "Vous êtes sur la voie de l'amour éternel. Continuez ainsi !"
				: compatibility < 70 ? "C'est comme trouver une chaussette assortie. Pas parfait, mais ça fonctionne !"
				: compatibility < 80 ? "Vous êtes sur le point de créer une histoire d'amour épique. À vos marques, prêts, partez !"
				: compatibility < 90 ? "Les étoiles sont alignées pour une romance épique ! Ça sent la passion !"
				: "WOW ! C'est de l'amour à première vue ! Préparez-vous pour une romance épique !";
		await interaction.reply({ embeds: [new EmbedBuilder().setColor(interaction.client.settings.bot.colors.primary).setDescription(`${user}, ${interaction.user} a calculé votre pourcentage de compatibilité amoureuse :revolving_hearts: !\n\n**Résultat :** ${compatibility}% !\n\n${comment}`)] });
	},
};