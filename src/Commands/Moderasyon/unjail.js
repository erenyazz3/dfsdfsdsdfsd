const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");
const config = require("../../../config.json");
const moment = require("moment");
const Ceza = require('../../Models/Cezalar')

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.owner) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")
   
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("Jailden çıkarılcak kullanıcıyı etiketlemeyi unuttun.");
    if(member.user.bot || member.id === message.author.id || !member.roles.cache.has(config.roles.jail)) return;

    message.react(config.emojis.onay);
    await member.roles.remove(config.roles.jail).catch(err => {});
    member.roles.remove(config.roles.karantina).catch(err => {});
await member.roles.add(config.roles.unregister).catch(err => {});

await moderasyondb.delete(`jaıxdd.${member.id}`);

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author}, ${member} adlı üyenin jail'ini kaldırdı.`)
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setFooter(client.user.username,client.user.avatarURL())
client.channels.cache.get(config.channel.jailog).send(embed);




};
exports.configuration = {
    CommandName: ["unjail"],
    description: "unjail yaparsınız",
    usage: "unjail [member]"
};
