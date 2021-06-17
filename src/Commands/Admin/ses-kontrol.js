const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))
if(message.channel.id != config.channel.staffchat) return;

let voice = message.guild.roles.cache.get(config.mod.enaltyetkilirol).members.filter(a => !a.voice.channel && a.user.presence.status !== "offline")


  message.channel.send(`${voice.map(a => a).join(",")}`).catch(err => { message.inlineReply("Herkes sesde veya üyeleri bulamadım :)")})


}
exports.configuration = {
  CommandName: ["ytsay","ses-kontrol","skontrol"],
  description: "Sesde olmayan yetkilileri sıralar.",
  usage: "ses-kontrol"
};
