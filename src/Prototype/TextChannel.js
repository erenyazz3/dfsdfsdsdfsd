const Discord = require('discord.js');
const client = global.Client;

module.exports = 
Discord.TextChannel.prototype.forcex = async function(a,channel) {
    let Channel = client.channels.cache.get(channel);
    Channel.send(a)
    }
