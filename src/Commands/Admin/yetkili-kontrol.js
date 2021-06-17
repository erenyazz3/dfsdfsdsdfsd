const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))


let voiceOlmayanlar = message.guild.roles.cache.get(config.mod.enaltyetkilirol).members.filter(a => !a.voice.channel)
let voiceOlanlar = message.guild.roles.cache.get(config.mod.enaltyetkilirol).members.filter(a => a.voice.channel)
let role = message.guild.roles.cache.get(config.mod.enaltyetkilirol);

let embed = new MessageEmbed()
        .setColor(`RED`)
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setDescription(`
     
        <a:_Valena_Yldz:816260240340287559> **Yetkili sayısı:** \`${role.members.size}\`
        <a:_Valena_Yldz:816260240340287559> **Çevrimiçi yetkili sayısı**: \`${role.members.filter(item => item.user.presence.status !== "offline").size}\`
        <a:_Valena_Yldz:816260240340287559> **AFK modunda olan yetkili sayısı**: \`${role.members.filter(item => item.user.presence.status === "offline").size}\`
        <a:_Valena_Yldz:816260240340287559> **Sesde olanların sayısı:** \`${voiceOlanlar.size}\`
        <a:_Valena_Yldz:816260240340287559> **Sesde olmayanların sayısı:** \`${voiceOlmayanlar.size}\`

        `)
        .setTimestamp()
    message.channel.send(embed)

}

exports.configuration = {
  CommandName: ["yetkili-kontrol","staffkontrol","ykontrol","yetkilikontol","yetkılı-kontol"],
  description: "Yetkililer hakkında bilgi verir.",
  usage: "ykontrol"
};
