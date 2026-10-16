const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Configuration
const TRIGGER_WORD = 'pluh';
const FORWARD_CHANNEL_ID = '1560496677608095868';
const FORWARD_MESSAGE = 'https://klipy.com/gifs/pluh-cat-2';

// Create the bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes(TRIGGER_WORD.toLowerCase())) {
        try {
            const targetChannel = await client.channels.fetch(FORWARD_CHANNEL_ID);

            if (targetChannel && targetChannel.isTextBased()) {
                await targetChannel.send(FORWARD_MESSAGE);
            } else {
                console.error('Channel not found or not text-based.');
            }
        } catch (error) {
            console.error('Failed to forward message:', error);
        }
    }
});

// Login using your environment variable
client.login(process.env.DISCORD_TOKEN);
