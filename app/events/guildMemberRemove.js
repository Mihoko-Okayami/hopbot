const { EmbedBuilder, Events } = require('discord.js');
module.exports = {
	name: Events.GuildMemberRemove,
	once: false,
	async execute(member) {
		const systemChannel = member.guild.systemChannel;
		if (systemChannel) {
			systemChannel.send({ embeds: [new EmbedBuilder().setColor(member.client.settings.bot.colors.danger).setAuthor({ name: `${member.user.tag} a quitté le serveur.`, iconURL: member.user.avatarURL() }).setTimestamp()], ephemeral: false });
		}
	},
};