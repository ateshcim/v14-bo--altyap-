const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmesini gösterir.'),
  // ownerOnly: true,
  async execute(client, interaction) {
    await interaction.reply(`🏓 API: **${Math.round(client.ws.ping)}ms**`);
  },
};
