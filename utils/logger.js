const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    addLog(client, logData) {
        client.logs.push(logData);
    },

    async sendLogs(client) {
        if (client.logs.length === 0) return;

        const logChannel = await client.channels.fetch(config.logChannelId).catch(() => null);
        if (!logChannel) {
            console.error('Canal de logs não encontrado');
            return;
        }

        const logs = [...client.logs];
        client.logs = [];

        for (const log of logs) {
            const embed = new EmbedBuilder()
                .setTimestamp(log.timestamp)
                .setFooter({ text: config.credits });

            switch (log.type) {
                case 'create':
                    embed.setTitle('Ticket Criado')
                        .setColor(config.colors.success)
                        .addFields(
                            { name: 'Usuário', value: `${log.user.tag} (${log.user.id})`, inline: true },
                            { name: 'Canal', value: `${log.channel.name}`, inline: true }
                        );
                    break;

                case 'claim':
                    embed.setTitle('Ticket Assumido')
                        .setColor(config.colors.primary)
                        .addFields(
                            { name: 'Staff', value: `${log.staff.tag} (${log.staff.id})`, inline: true },
                            { name: 'Canal', value: `${log.channel.name}`, inline: true }
                        );
                    break;

                case 'close':
                    embed.setTitle('Ticket Fechado')
                        .setColor(config.colors.warning)
                        .addFields(
                            { name: 'Staff', value: `${log.staff.tag} (${log.staff.id})`, inline: true },
                            { name: 'Canal', value: `${log.channel.name}`, inline: true }
                        );
                    break;

                case 'delete':
                    embed.setTitle('Ticket Deletado')
                        .setColor(config.colors.danger)
                        .addFields(
                            { name: 'Staff', value: `${log.staff.tag} (${log.staff.id})`, inline: true },
                            { name: 'Canal', value: `${log.channel.name}`, inline: true }
                        );
                    break;
            }

            await logChannel.send({ embeds: [embed] });
        }
    }
};
