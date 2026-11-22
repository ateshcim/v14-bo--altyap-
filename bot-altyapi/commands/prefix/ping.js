module.exports = {
  name: 'ping',
  aliases: ['gecikme'],
  description: 'Botun gecikmesini gösterir.',
  // permissions: ['ManageMessages'],
  // ownerOnly: true,
  async execute(client, message, args) {
    const sent = await message.reply('Ölçülüyor...');
    await sent.edit(`🏓 Mesaj: **${sent.createdTimestamp - message.createdTimestamp}ms** | API: **${Math.round(client.ws.ping)}ms**`);
  },
};
