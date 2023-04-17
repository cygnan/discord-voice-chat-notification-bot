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

// {
//   'みんなの机': '<message id>',
//   'サブの机': '<message id>'
// }
let messageIds: { [name: string]: string } = {};
let displayNames: { [name: string]: string[] } = {};

client.on('voiceStateUpdate', (oldState, newState) => {
    const textChannel = oldState.member?.guild.channels.cache.get(channelId) as TextChannel;

    if (oldState.channelId === null && newState.channelId !== null) {
        // textChannel.send(
        //     `🤗  **${newState.member?.displayName}** が ${newState.channel?.name} に座りました。`
        // );
        if (newState.channel?.members.size === 1) {
            let channelName = newState.channel?.name;
            let body = `🤗  **${newState.member?.displayName}** が ${newState.channel?.name} に座りました。`
            textChannel.send(body).then((message) => {
                console.log(`Sent message: \`${body}\``)
                messageIds[channelName] = message.id;
                displayNames[channelName] = [newState.member?.displayName as string];
            }).catch(console.error);
        } else {
            let channelName = newState.channel?.name || '';
            let displayName = newState.member?.displayName || 'undefined';
            let id = messageIds[channelName]
            // console.log(`id: ${id}`)
            textChannel.messages.fetch(id)
                .then((message) => {
                    // console.log(message.content);
                    // let body = message.content;
                    // if (!body.includes(displayName)) {
                    if (!displayNames[channelName].includes(displayName)) {
                        // let editedBody = body.replace(
                        //     ` が ${newState.channel?.name} に座りました。`,
                        //     `, **${displayName}** が ${newState.channel?.name} に座りました`
                        // )
                        displayNames[channelName].push(displayName)
                        let displayNamesInVoiceChannel = displayNames[channelName].join('**, **')
                        let editedBody = `🤗  **${displayNamesInVoiceChannel}** が ${newState.channel?.name} に座りました。`
                        message.edit(editedBody);
                        console.log(`Edited message: \`${editedBody}\``)
                    }
                }).catch(console.error);
        }
        return;
    } else if (oldState.channelId !== null && newState.channelId === null) {
        // textChannel.send(
        //     `👋  **${oldState.member?.displayName}** が ${oldState.channel?.name} から離れました。`
        // );
        // console.log(`oldState.channel?.members.size: ${oldState.channel?.members.size}`)
        // console.log(`newState.channel?.members.size: ${newState.channel?.members.size}`)
        if (oldState.channel?.members.size === 0) {
            let channelName = oldState.channel?.name;
            let body = `👋  ${channelName} から全員が離れました。`
            textChannel.send(body);
            console.log(`Sent message: \`${body}\``)
            displayNames[channelName] = [];
            messageIds[channelName] = '';
        }
        return;
    }
});

client.login(token);
