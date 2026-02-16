const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require('../config');
const logger = require('./logger');

module.exports = {
    async handle(interaction, client) {
        const customId = interaction.customId;

        if (customId === 'create_ticket') {
            await this.createTicket(interaction, client);
        } else if (customId === 'close_ticket') {
            await this.closeTicket(interaction, client);
        } else if (customId === 'delete_ticket') {
            await this.deleteTicket(interaction, client);
        } else if (customId === 'claim_ticket') {
            await this.claimTicket(interaction, client);
        } else if (customId === 'cancel_close') {
            await this.cancelClose(interaction);
        } else if (customId === 'confirm_close') {
            await this.confirmClose(interaction, client);
        } else if (customId === 'confirm_delete') {
            await this.confirmDelete(interaction, client);
        }
    },

    async createTicket(interaction, client) {
        const guild = interaction.guild;
        const member = interaction.member;

        // Check if user already has a ticket
        const existingTicket = guild.channels.cache.find(
            ch => ch.name === `${config.ticketConfig.ticketName}-${member.user.username.toLowerCase()}` && ch.parentId === config.ticketCategoryId
        );

        if (existingTicket) {
            return interaction.reply({ content: 'Você já possui um ticket aberto!', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const ticketChannel = await guild.channels.create({
                name: `${config.ticketConfig.ticketName}-${member.user.username}`,
                type: ChannelType.GuildText,
                parent: config.ticketCategoryId,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: member.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    }
                ]
            });

            const embed = new EmbedBuilder()
                .setTitle('Ticket Criado')
                .setDescription(`Olá ${member}, bem-vindo ao seu ticket. Nossa equipe entrará em contato em breve.`)
                .setColor(config.colors.success)
                .setFooter({ text: config.credits })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('claim_ticket')
                        .setLabel('Assumir')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('Fechar')
                        .setStyle(ButtonStyle.Danger)
                );

            await ticketChannel.send({ content: `${member}`, embeds: [embed], components: [row] });
            await interaction.editReply({ content: `Ticket criado: ${ticketChannel}` });

            logger.addLog(client, {
                type: 'create',
                user: member.user,
                channel: ticketChannel,
                timestamp: new Date()
            });

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'Erro ao criar o ticket.' });
        }
    },

    async claimTicket(interaction, client) {
        const member = interaction.member;

        if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: 'Você não tem permissão para assumir tickets.', ephemeral: true });
        }

        await interaction.channel.permissionOverwrites.edit(member, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        });

        const embed = new EmbedBuilder()
            .setDescription(`Ticket assumido por ${member}`)
            .setColor(config.colors.success)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

        logger.addLog(client, {
            type: 'claim',
            user: member.user,
            staff: member.user,
            channel: interaction.channel,
            timestamp: new Date()
        });
    },

    async closeTicket(interaction, client) {
        const member = interaction.member;

        if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: 'Você não tem permissão para fechar tickets.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('Confirmar Fechamento')
            .setDescription(config.ticketConfig.closeConfirmMessage)
            .setColor(config.colors.warning);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirm_close')
                    .setLabel('Confirmar')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('cancel_close')
                    .setLabel('Cancelar')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },

    async confirmClose(interaction, client) {
        const channel = interaction.channel;
        const member = interaction.member;

        await interaction.update({ content: 'Fechando ticket...', embeds: [], components: [] });

        const embed = new EmbedBuilder()
            .setDescription(`Ticket fechado por ${member}`)
            .setColor(config.colors.danger)
            .setTimestamp();

        const deleteRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('delete_ticket')
                    .setLabel('Deletar Ticket')
                    .setStyle(ButtonStyle.Danger)
            );

        await channel.send({ embeds: [embed], components: [deleteRow] });

        await channel.permissionOverwrites.edit(channel.guild.id, {
            SendMessages: false
        });

        logger.addLog(client, {
            type: 'close',
            user: member.user,
            staff: member.user,
            channel: channel,
            timestamp: new Date()
        });

        await logger.sendLogs(client);
    },

    async cancelClose(interaction) {
        await interaction.update({ content: 'Fechamento cancelado.', embeds: [], components: [] });
    },

    async deleteTicket(interaction, client) {
        const member = interaction.member;

        if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: 'Você não tem permissão para deletar tickets.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('Confirmar Exclusão')
            .setDescription(config.ticketConfig.deleteConfirmMessage)
            .setColor(config.colors.danger);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirm_delete')
                    .setLabel('Confirmar')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('cancel_close')
                    .setLabel('Cancelar')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },

    async confirmDelete(interaction, client) {
        const channel = interaction.channel;
        const member = interaction.member;

        await interaction.update({ content: 'Deletando ticket em 5 segundos...', embeds: [], components: [] });

        logger.addLog(client, {
            type: 'delete',
            user: member.user,
            staff: member.user,
            channel: channel,
            timestamp: new Date()
        });

        await logger.sendLogs(client);

        setTimeout(async () => {
            await channel.delete();
        }, 5000);
    }
};
