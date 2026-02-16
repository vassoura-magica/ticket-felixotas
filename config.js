require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    logChannelId: process.env.LOG_CHANNEL_ID,
    ticketCategoryId: process.env.TICKET_CATEGORY_ID,
    ticketConfig: {
        panelTitle: 'Sistema de Tickets',
        panelDescription: 'Clique no botão abaixo para abrir um ticket e receber suporte da nossa equipe.',
        buttonLabel: 'Abrir Ticket',
        ticketName: 'ticket',
        closeConfirmMessage: 'Tem certeza que deseja fechar este ticket?',
        deleteConfirmMessage: 'Tem certeza que deseja deletar este ticket?'
    },
    colors: {
        primary: 0x5865F2,
        success: 0x57F287,
        warning: 0xFEE75C,
        danger: 0xED4245
    },
    credits: 'Desenvolvido por felixotas'
};
