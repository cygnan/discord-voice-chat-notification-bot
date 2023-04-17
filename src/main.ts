// const { Client, Intents } = require('discord.js');
import {Client, GatewayIntentBits, TextChannel} from "discord.js";
const { token, channelId } = require('../config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member !== null) {
        const channel = oldState.member.guild.channels.cache.get(channelId);

        if (oldState.channelId === null && newState.channelId !== null) {
            if (oldState.member !== null) {
                (channel as TextChannel).send(`[**参加**] ${oldState.member.displayName} さんが入室しました。`);
                return;
            }
        } else if (oldState.channelId !== null && newState.channelId === null) {
            if (newState.member !== null) {
                (channel as TextChannel).send(`[**退出**] ${newState.member.displayName} さんが退出しました。`);
                return;
            }
        }
    }
});

client.login(token);
