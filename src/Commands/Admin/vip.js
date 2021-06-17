const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner,config.mod.owner2].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("Vip rolü verilcek kullanıcıyı etiketle");
    if(member.user.bot) return;

    if(member.roles.cache.has(config.roles.vip)){
        await member.roles.remove(config.roles.vip);
        message.channel.send(`${member} adlı üyede \`vip\` rolü olduğu vip rolünü ondan aldım.`)
    } else {
        message.react(config.emojis.onay);
        await member.roles.add(config.roles.vip);
          message.channel.send(`Sorunsuz bir şekilde ${member} adlı üyeye \`vip\` rolü verildi.`);
    }
};
exports.configuration = {
  CommandName: ["vip","vip-ver","vipver","elite"],
  description: "Etiketlenen kullanıcıya vip rolü verir.",
  usage: "vip @Member"
};
