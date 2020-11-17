module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, message, args) {
        return message.channel.send('Pong.');
    }
}