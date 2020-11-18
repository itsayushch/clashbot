const { MessageEmbed } = require("discord.js");
const { league: emoji } = require('../emoji/index');

module.exports = {
    name: 'members',
    description: 'Members Command!',
    async execute(client, message, args) {
        const clan = await client.coc.clan(args[0]);
        if (!clan.ok) return message.channel.send(data.reason);

        const mem1 = clan.memberList.slice(0, 25);
        const mem2 = clan.memberList.slice(25, 50);

        const embed = new MessageEmbed();
        if (!mem2.length) {
            const embed = new MessageEmbed()
                .setColor(0x2AC1F2)
                .setDescription(mem1.map(m => `${emoji[m.league.id]} \`${m.tag.padEnd(10, ' ')} ${m.name.padEnd(15, ' ')}\``))
                .setAuthor(`${clan.name} (${clan.tag}) ~ ${clan.members}/50`, clan.badgeUrls.small);
            message.channel.send(embed);
        } else {
            const msg = await message.channel.send({
                embed: embed.setColor(0x2AC1F2)
                    .setDescription(mem1.map(m => `${emoji[m.league.id]} \`${m.tag.padEnd(10, ' ')} ${m.name.padEnd(15, ' ')}\``)).setAuthor(`${clan.name} (${clan.tag}) ~ ${clan.members}/50`, clan.badgeUrls.small)
                    .setFooter('Page 1/2')
            });

            for (const emoji of ['⬅', '➡']) {
                await msg.react(emoji);
            }

            const collector = msg.createReactionCollector(
                (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id,
                { time: 45000, max: 10 }
            );
            collector.on('collect', async reaction => {
                if (reaction.emoji.name === '➡') {
                    const embed = new MessageEmbed();
                    embed.setDescription(mem2.map(m => `${emoji[m.league.id]} \`${m.tag.padEnd(10, ' ')} ${m.name.padEnd(15, ' ')}\``));
                    await msg.edit({
                        embed: embed.setColor(0x2AC1F2).setAuthor(`${clan.name} (${clan.tag}) ~ ${clan.members}/50`, clan.badgeUrls.small).setFooter('Page 2/2')
                    });
                    await reaction.users.remove(message.author.id);
                }

                if (reaction.emoji.name === '⬅') {
                    await msg.edit({
                        embed: new MessageEmbed()
                            .setColor(0x2AC1F2)
                            .setDescription(mem1.map(m => `${emoji[m.league.id]} \`${m.tag.padEnd(10, ' ')} ${m.name.padEnd(15, ' ')}\``))
                            .setAuthor(`${clan.name} (${clan.tag}) ~ ${clan.members}/50`, clan.badgeUrls.small)
                            .setFooter('Page 1/2')
                    });
                    await reaction.users.remove(message.author.id);
                }
            });

            collector.on('end', async () => {
                await msg.reactions.removeAll().catch(() => null);
            });
        }
    }
}