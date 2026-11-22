const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`[READY] ${client.user.tag} aktif.`);

    // Slash komutlarını kaydet (guildId doluysa sunucuya anında, boşsa global)
    const body = client.slashCommands.map((c) => c.data.toJSON());
    try {
      if (client.config.guildId) {
        const guild = await client.guilds.fetch(client.config.guildId);
        await guild.commands.set(body);
        console.log(`[SLASH] ${body.length} komut sunucuya kaydedildi.`);
      } else {
        await client.application.commands.set(body);
        console.log(`[SLASH] ${body.length} komut global olarak kaydedildi.`);
      }
    } catch (err) {
      console.error('[SLASH] Kayıt hatası:', err);
    }
  },
};
