const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Gerenciar sistema de tickets')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('painel')
                .setDescription('Cria o painel de tickets')
                .addChannelOption(option =>
                    option
                        .setName('canal')
                        .setDescription('Canal onde o painel será enviado')
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'painel') {
            const channel = interaction.options.getChannel('canal');

            const embed = new EmbedBuilder()
                .setTitle(config.ticketConfig.panelTitle)
                .setDescription(config.ticketConfig.panelDescription)
                .setColor(config.colors.primary)
                .setFooter({ text: config.credits })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('create_ticket')
                        .setLabel(config.ticketConfig.buttonLabel)
                        .setStyle(ButtonStyle.Primary)
                );

            await channel.send({ embeds: [embed], components: [row] });
            await interaction.reply({ content: 'Painel de tickets criado com sucesso!', ephemeral: true });
        }
    }
};
