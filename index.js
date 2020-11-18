require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { Client: ClashClient } = require('clashofclans.js');
const { readdirSync } = require('fs');

const client = new Client();

client.commands = new Collection();
client.coc = new ClashClient({ token: process.env.CLASH_API });;

client.on('ready', () => {
    loadCommands();
    console.log('READY');
});

client.on('message', (message) => {
    const prefix = '.';
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    client.commands.get(command).execute(client, message, args);
});

const loadCommands = () => {
    const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
}

client.login(process.env.TOKEN);
