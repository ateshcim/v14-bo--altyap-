const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(client, message) {
    if (message.author.bot || !message.guild) return;

    const prefix = client.config.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const name = args.shift()?.toLowerCase();
    if (!name) return;

    const cmd =
      client.prefixCommands.get(name) ||
      client.prefixCommands.get(client.aliases.get(name));
    if (!cmd) return;

    if (cmd.ownerOnly && !client.config.owners.includes(message.author.id)) return;
    if (cmd.permissions && !message.member.permissions.has(cmd.permissions)) {
      return message.reply('Bu komut için yetkin yok.');
    }

    try {
      await cmd.execute(client, message, args);
    } catch (err) {
      console.error(`[PREFIX] ${name} hata:`, err);
      message.reply('Komut çalışırken bir hata oluştu.').catch(() => {});
    }
  },
};
