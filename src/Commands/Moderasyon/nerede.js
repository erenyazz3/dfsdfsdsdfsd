const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.sponsor) && !message.member.hasPermission("ADMINISTRATOR")) return;

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!harry) return message.reply("Kullanıcı hangi ses kanalında olduğunu görmek için bir kullanıcı etiketlemelisin.");
if(!harry.voice.channel) return message.channel.send("Etiketlenen kullanıcı herhangi bir ses kanalında değil.")
  

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
     ${harry} Adlı kullanıcı **${harry.voice.channel.name}** adlı kanalda

     \`>\` Kanalda ki Kişi Sayısı: **${harry.voice.channel.members.size}**
     \`>\` Mic açıkmı: **${harry.voice.selfMute === false ? `Açık ${client.emojis.cache.get(config.emojis.onay)}` : `Kapalı ${client.emojis.cache.get(config.emojis.red)}`}**
     \`>\` Kullaklık durumu: **${harry.voice.selfDeaf === true ? `Kapalı ${client.emojis.cache.get(config.emojis.red)}`: `Açık ${client.emojis.cache.get(config.emojis.onay)}`}**
        `)
        .setTimestamp()
    message.channel.send(embed)

}

exports.configuration = {
  CommandName: ["nerede","hangikanalda","nerde"],
  description: "Kullanıcın hangi kanalda olduğunu gösterir.",
  usage: "nerede @Member"
};
