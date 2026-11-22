const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const eventsDir = path.join(__dirname, '..', 'events');
  for (const file of fs.readdirSync(eventsDir).filter((f) => f.endsWith('.js'))) {
    const event = require(path.join(eventsDir, file));
    if (!event.name || typeof event.execute !== 'function') continue;

    if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
    else client.on(event.name, (...args) => event.execute(client, ...args));
  }
};
