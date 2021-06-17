const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MODERASYON");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    let embed2 = new MessageEmbed()
        .setColor("#444")
        .setAuthor("HATA!",client.user.avatarURL())
        .setDescription(`Öncelikle bir ses kanalına giriş yapmalısınız.`)
    if(!message.member.voice.channel) return message.channel.send(embed2);

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.channel.send("Çekmek istediğiniz kullanıcı etiketleyin.");
    if(harry.id === message.author.id || harry.user.bot || !harry.voice.channel) return;

    if(message.member.hasPermission("ADMINISTRATOR")) {
        message.react(config.emojis.onay);
        harry.voice.setChannel(message.member.voice.channelID);
    } else {
        let embed = new MessageEmbed()
            .setColor("#666")
            .setDescription(`${harry}, ${message.author} Seni yanına çekmek istiyormuş kabul ediyormusun?`)
            .setAuthor(client.user.username, client.user.avatarURL({dynamic: true}))
        message.channel.send(embed).then(x => {

            x.react('👍');

            const reactionFilter = (reaction, user) => {
                return ['👍'].includes(reaction.emoji.name) && user.id === harry.id;
            };

            x.awaitReactions(reactionFilter, {max: 1, time: 10000, error: ['time']}).then(collected => {
                    const reaction = collected.first();
                    if (reaction) {
                        harry.voice.setChannel(message.member.voice.channelID);
                    }
                })
        })
    }
};

exports.configuration = {
    CommandName: ["çek"],
    description: "idsini girilen kullanıcıyı yanınıza çekersiniz.",
    usage: "çek [member]"
};
