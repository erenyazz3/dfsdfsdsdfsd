const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))


if(!args[0]) return message.channel.send(`Bir argüman belirtmelisin \`ver/al\``);
if(args[0] === "ver"){
    let members =  message.guild.members.cache.filter(member => member.roles.cache.has(config.mod.enaltyetkilirol) && member.voice.channelID === config.channel.toplantıKanalID);
    members.array().forEach(element => {
    setTimeout(async() => {
await element.roles.add(config.mod.katıldı);
},3000)
})
};

if(args[0] === "al"){
    let members =  message.guild.members.cache.filter(member => member.roles.cache.has(config.mod.enaltyetkilirol));
    members.array().forEach(element => {
    setTimeout(async() => {
await element.roles.remove(config.mod.katıldı);
},3000)
})
}


};
exports.configuration = {
  CommandName: ["katıldı"],
  description: "Toplantıda olanlara katıldı rolü verir veya alır.",
  usage: "katıldı ver/al"
};
