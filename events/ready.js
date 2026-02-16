module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot online como ${client.user.tag}`);
        console.log(client.guilds.cache.size + ' servidores conectados');
    }
};
