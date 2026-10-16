// Import Discord.js
const { Client, GatewayIntentBits } = require("discord.js");

// Create the bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

// Bot ready event
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Message listener
client.on("messageCreate", (message) => {
    console.log("Message received:", message.content); // DEBUG LINE

    if (message.author.bot) return;

    if (message.content.toLowerCase().includes("pluh")) {
        message.channel.send("https://klipy.com/gifs/pluh-cat-2");
    }
});

// Login using Render environment variable
client.login(process.env.DISCORD_TOKEN);

// -----------------------------------------------------------------------------
// Render FREE TIER FIX – tiny web server so Render detects an open port
// -----------------------------------------------------------------------------
const http = require("http");
http.createServer((req, res) => {
    res.end("Bot is running");
}).listen(process.env.PORT || 3000);
