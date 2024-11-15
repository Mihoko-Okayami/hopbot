const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
module.exports = class HopBot extends Client {
	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.MessageContent
			],
			partials: [Partials.Channel],
		});
		Object.assign(this, {
			settings: require('../settings.json'),
			logger: new (require('./logger.js'))(),
			commands: new Collection(),
			cooldowns: new Collection()
		});
	}
	init = async () => {
		await require('./handlers/commands.js')(this);
		await require('./handlers/events.js')(this);
		this.login(this.settings.api.discord);
	}
}