const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!harry) return message.reply("Hangi cihazdan bağlandığını görmek istediğiniz kullanıcıyı etiketle.");


let Cihaz = Object.keys(harry.user.presence.clientStatus);
  
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
        ${Cihaz.map((a,i) => `\`${i+1}\`. ${a.replace("web","Tarayıcı").replace("desktop","Bilgisayar").replace("mobile","Telefon")} `).join("\n")}
        `)
        .setTimestamp()
    message.channel.send(embed)

}

exports.configuration = {
  CommandName: ["cihaz"],
  description: "Kullanıcın hangi cihazlardan bağlandığnı gösterir.",
  usage: "cihaz @Member"
};
