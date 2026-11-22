const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  // ---- Prefix komutları ----
  const prefixDir = path.join(__dirname, '..', 'commands', 'prefix');
  for (const file of fs.readdirSync(prefixDir).filter((f) => f.endsWith('.js'))) {
    const cmd = require(path.join(prefixDir, file));
    if (!cmd.name || typeof cmd.execute !== 'function') {
      console.warn(`[PREFIX] ${file} geçersiz (name/execute eksik).`);
      continue;
    }
    client.prefixCommands.set(cmd.name, cmd);
    (cmd.aliases || []).forEach((a) => client.aliases.set(a, cmd.name));
  }

  // ---- Slash komutları ----
  const slashDir = path.join(__dirname, '..', 'commands', 'slash');
  for (const file of fs.readdirSync(slashDir).filter((f) => f.endsWith('.js'))) {
    const cmd = require(path.join(slashDir, file));
    if (!cmd.data || typeof cmd.execute !== 'function') {
      console.warn(`[SLASH] ${file} geçersiz (data/execute eksik).`);
      continue;
    }
    client.slashCommands.set(cmd.data.name, cmd);
  }

  console.log(`[HANDLER] ${client.prefixCommands.size} prefix, ${client.slashCommands.size} slash komut yüklendi.`);
};
