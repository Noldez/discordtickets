const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const chalk = require('chalk');

require('dotenv').config();

// Client trigger options
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_INVITES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

bot.login(process.env.TOKEN);

bot.slashcommands = new Collection();
  fs.readdirSync("./src/events").forEach((module) => {
    const eventFiles = fs
      .readdirSync(`./src/events/${module}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(`./events/${module}/${file}`);
      event.category = module;
      let eventName = file.split(".")[0];
      console.log(`${chalk.black.bgGreen('Loaded event')}`, `${chalk.white(`${eventName.toUpperCase()}`)}`)

      bot.on(eventName, event.bind(null, bot));
    }
  });

// Avoid bot crashing down from a simple mistake
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});

// Crash if the error is too complicated
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
  });

