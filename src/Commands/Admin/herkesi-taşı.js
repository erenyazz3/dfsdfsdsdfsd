const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.owner) && !message.member.hasPermission("ADMINISTRATOR")) return;

let kanalID = args[0];
if(!kanalID) return message.channel.send(`Kanal id girmeyi unuttun.`);

let members = message.guild.members.cache.filter(a => a.voice.channel && !a.user.bot && a.voice.parentID !== config.channels.teyitParentID);

setTimeout(() => {
    members.forEach(element => {
        element.voice.setChannel(kanalID)
    });
},2000);

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
Sesdeki kullanıcılar **${client.channels.cache.get(kanalID).name}** kanalına taşındı.
        `)
        .setTimestamp()
    message.channel.send(embed)

}

exports.configuration = {
  CommandName: ["herkesi-taşı","herkesiçek","herkesi-çek","ever-çek","taşı"],
  description: "Kullanıcın hangi kanalda olduğunu gösterir.",
  usage: "nerede @Member"
};
