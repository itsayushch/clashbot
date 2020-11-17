const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clan',
    description: 'Clan Command!',
    async execute(client, message, args) {
        const data = await client.coc.clan(args[0]);
        if (!data.ok) return message.channel.send(data.reason);

        const lead = data.memberList.find(m => m.role === 'leader');
        const embed = new MessageEmbed()
            .setColor(0x38b6ff)
            .setDescription(data.description ? data.description : '')
            .setTitle(`${data.name} - ${data.tag}`)
            .setThumbnail(`${data.badgeUrls.medium}`)
            .addField('Level', data.clanLevel, true)
            .addField('Members count', data.members, true)
            .addField('Required Trophies', `${data.requiredTrophies}`, true)
            .addField('Type', `${data.type.replace(/open/g, 'Open').replace(/inviteOnly/g, 'Invite Only').replace(/closed/g, 'Closed')}`, true)
            .addField('Location', data.location ? data.location.name : 'None', true)
            .addField('Points', `Clan Points: ${data.clanPoints}\nVersus Points${data.clanVersusPoints}`, true)
            .addField('War Frequency', data.warFrequency, true)
            .addField('War Win Streak ', data.warWinStreak, true)
            .addField('War Wins', data.warWins, true)
            .addField('Clan Leader', data.memberList.length ? `**${lead.name} (${lead.tag})**` : 'None', false);

        return message.channel.send({ embed });
    }
}