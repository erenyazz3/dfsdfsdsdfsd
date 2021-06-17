const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    ///FORCEX TARAFINDAN KODLANDI ❤️ 
    
if(!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!harry) return message.reply("bir kullanıcı etiketlemelisin.");


let isimler = await registerdb.get(`register.${harry.id}`) || [];

let nameFilter = isimler.map((f,i) => `\`${i+1}.\` \`${f.name} | ${f.age}\` (${f.rol}) `).slice(0,10).join("\n")

let embed = new MessageEmbed()
.setColor("RANDOM")
.setThumbnail(message.author.avatarURL({dynamic:true}))
.setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
.setDescription(`
${harry} adlı kişinin eski isimleri :arrow_down: 

${!isimler.length ? "**Kullanıcın eski isimlerini bulamadım**" : nameFilter}
`)
.setTimestamp()
message.channel.send(embed)

};

exports.configuration = {
  CommandName: ["isimler"],
  description: "kullanıcın eski isimlerini gösterir.",
  usage: "isimler @Member"
};
