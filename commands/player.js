const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'player',
    description: 'Player Command!',
    async execute(client, message, args) {
        const data = await client.coc.player(args[0]);
        if (!data.ok) return message.channel.send(data.reason);

        const embed = new MessageEmbed()
            .setAuthor(`${data.name} - ${data.tag.toUpperCase()}`)
            .setTitle('Open In-Game')
            .setURL(`https://link.clashofclans.com/en?action=OpenPlayerProfile&tag=${data.tag.replace(/#/g, '')}`)
            .setThumbnail(`https://coc.guide/static/imgs/other/town-hall-${data.townHallLevel}.png`)
            .setColor(0x38b6ff)
            .addField('XP Level', `<:xp:715893810521047142> ${data.expLevel}`, true)
            .addField('Best Trophies', `<:trophy__:534753357399588874> ${data.bestTrophies}`, true)
            .addField('Trophies', `<:trophy__:534753357399588874> ${data.trophies}`, true)
            .addField('War Stars', `<:warstars_:534759020309774337> ${data.warStars}`, true)
            .addField('Attacks Won', `<:yes:705748854703783989> ${data.attackWins}`, true)
            .addField('Town Hall', th[data.townHallLevel], true)
            .addField('Clan', data.clan ? `${membership[data.role]} of **${data.clan.name}** [${data.clan.tag}](https://link.clashofclans.com/en?action=OpenClanProfile&tag=${data.clan.tag.replace(/#/g, '')})` : '**Not In A Clan**', false)
            .addField('Builder Hall', data.builderHallLevel ? `${bh[data.builderHallLevel]} ${data.builderHallLevel}` : 'None', true)
            .addField('Versus Trophies', `${data.versusTrophies}`, true)
            .addField('Best Versus Trophies', `${data.bestVersusTrophies}`, true)
            .addField('Versus Battle Wins', `${data.versusBattleWins}`, true)
            .addField('Donations', `${data.donations}`, true)
            .addField('Donations Received', `${data.donationsReceived}`, true);

        return message.channel.send({ embed });
    }
}
