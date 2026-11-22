# discord.js v14 Altyapı (Prefix + Slash)

## Kurulum
1. `npm install`
2. `config.json` içini doldur (token, clientId, istersen guildId)
3. Developer Portal > Bot > **Message Content Intent** ve **Server Members Intent** aç
4. `npm start`

## Yeni komut eklemek
- Prefix: `commands/prefix/komut.js` -> `{ name, aliases, execute(client, message, args) }`
- Slash:  `commands/slash/komut.js`  -> `{ data: SlashCommandBuilder, execute(client, interaction) }`
- Slash komutları bot açılışında otomatik kaydolur (guildId doluysa sunucuya anında, boşsa global).

## Yeni event eklemek
`events/olay.js` -> `{ name: Events.X, once?: true, execute(client, ...args) }`
