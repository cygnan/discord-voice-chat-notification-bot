import {Client, GatewayIntentBits, TextChannel, VoiceChannel} from "discord.js";
require('dotenv').config();

const channelId = process.env.channelId || '';
if (channelId === '') new Error("channelId is undefined");
const token = process.env.token || '';
if (token === '') new Error("token is undefined");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const channel = oldState.member?.guild.channels.cache.get(channelId);

    if (oldState.channelId === null && newState.channelId !== null) {
        (channel as TextChannel).send(
            `🤗  **${oldState.member?.displayName}** が ${newState.channel?.name} に座りました。`
        );
        return;
    } else if (oldState.channelId !== null && newState.channelId === null) {
        (channel as TextChannel).send(
            `👋  **${newState.member?.displayName}** が ${oldState.channel?.name} から離れました。`
        );
        return;
    }
});

client.login(token);
