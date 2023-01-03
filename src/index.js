const { Client, Intents, Collection } = require("discord.js");


require('dotenv').config();

// Client trigger options
const botClient = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_INVITES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

botClient.login(process.env.TOKEN);

// Collections, maps and registries for command/event loading
botClient.slashcommands = new Collection();
botClient.functions = require('./utils/functions')
require("./utils/managers/registryManager")(botClient);

// Database connection
databaseManager.dbConnect();


// Avoid bot crashing down from a simple mistake
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});

// Crash if the error is too complicated
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
  });

