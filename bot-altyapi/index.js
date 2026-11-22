const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Prefix komutları için Developer Portal'dan da açın
  ],
  partials: [Partials.Channel, Partials.Message, Partials.GuildMember],
});

client.config = config;
client.prefixCommands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

process.on('unhandledRejection', (err) => console.error('[unhandledRejection]', err));
process.on('uncaughtException', (err) => console.error('[uncaughtException]', err));

client.login(config.token);
