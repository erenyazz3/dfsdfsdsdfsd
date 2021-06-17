const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))
if(message.channel.id != config.channel.adminChannel) return;

let Role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if(!Role) return message.reply("Rol hakkında bilgi almak için bir rol etiketlemelisin.");


    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
     
        <a:Darkside_Tag5:809729767350730774> **Rolün adı:** ${Role.name.toLowerCase()} (\`${Role.id}\`)
        <a:Darkside_Tag5:809729767350730774> **Rolün rengi:** \`#${Role.color}\`
        <a:Darkside_Tag5:809729767350730774> **Roldeki üye sayısı:** \`${Role.members.size}\`
        <a:Darkside_Tag5:809729767350730774> **Etiketlenebilir mi?:**  \`${Role.mentionable === true ? "Evet" : "Hayır"}\`

        :white_small_square: Role sahip olan kullanıcılar;
        ${Role.members.size > 20 ? "**Sıralanamadı**" : Role.members.map(a => a).join(",")}
        `)
        .setTimestamp()
    message.channel.send(embed)

}

exports.configuration = {
  CommandName: ["rol","rolbilgi","rol-bilgi","rolsorgu","rol-sorgu"],
  description: "Rol hakkında bilgi verir.",
  usage: "rol @Role"
};
