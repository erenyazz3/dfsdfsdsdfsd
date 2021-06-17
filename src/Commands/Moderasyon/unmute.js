const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.chatmute) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")
   
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("Mutesini kaldırcağın kullanıcıyı etiketlemeyi unuttun.");
    if(member.user.bot || member.id === message.author.id || !member.roles.cache.has(config.roles.muted)) return;
let sebep = args.slice(1).join(" ")
if(!sebep) sebep = "sebep girilmemiş.";

    message.react(config.emojis.onay);
    
member.roles.remove(config.roles.muted).catch(err => {});

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`
        **Kullanıcın Mutesi Kaldırıldı**

        Kaldıran Moderatör: ${message.author} (\`${message.author.id}\`)
        Üye: ${member} (\`${member.id}\`)
        Sebep: **${sebep}**
        `)
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setFooter(client.user.username,client.user.avatarURL())
client.channels.cache.get(config.channel.unmutelog).send(embed);




};
exports.configuration = {
    CommandName: ["unmute"],
    description: "unjail yaparsınız",
    usage: "unmute [member] [sebep]"
};
