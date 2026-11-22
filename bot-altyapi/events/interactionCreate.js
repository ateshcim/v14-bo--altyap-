const { Events, MessageFlags } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return;

    if (cmd.ownerOnly && !client.config.owners.includes(interaction.user.id)) {
      return interaction.reply({ content: 'Bu komut sadece yapımcıya özel.', flags: MessageFlags.Ephemeral });
    }

    try {
      await cmd.execute(client, interaction);
    } catch (err) {
      console.error(`[SLASH] ${interaction.commandName} hata:`, err);
      const payload = { content: 'Komut çalışırken bir hata oluştu.', flags: MessageFlags.Ephemeral };
      if (interaction.replied || interaction.deferred) interaction.followUp(payload).catch(() => {});
      else interaction.reply(payload).catch(() => {});
    }
  },
};
