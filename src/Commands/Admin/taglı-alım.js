const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek i�in yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

if(!args[0]) return message.channel.send("Argüman belirtmeyi unuttun `aç/kapat`");

if(args[0] == "aç" || args[0] === "ac")  {
	let taglıalım = await registerdb.get(`taglıalım.${message.guild.id}`) || null;
	if(taglıalım !== null) return message.channel.send(`${client.emojis.cache.get(config.emojis.red)} Taglı alım zaten açılmış.`);
	
  await registerdb.set(`taglıalım.${message.guild.id}`,"TAGLI");
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
      \`TAGLI_ALIM\` Sistemi artık aktif sunucumuzun kayıtı artık **TAGLI_ALIM** şeklinde olcaktır.!
        `)
        .setTimestamp()
    message.channel.send(embed)

}

if(args[0] == "kapat" || args[0] === "sıfırla")  {
  let taglıalım = await registerdb.get(`taglıalım.${message.guild.id}`) || null;
	if(taglıalım === null) return message.channel.send(`${client.emojis.cache.get(config.emojis.red)} Taglı alım zaten kapatılmış.`);
	
	await registerdb.delete(`taglıalım.${message.guild.id}`);
	
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
      \`TAGLI_ALIM\` Sistemi başarılı bir şekilde kapatılmıştır artık alımlar **TAGSIZ** alım şeklinde.!
        `)
        .setTimestamp()
    message.channel.send(embed)

}

}

exports.configuration = {
  CommandName: ["taglı-alım","alım","taglıtalım"],
  description: "taglı alımı sistemini ayarlarsınız.",
  usage: "taglı-alım aç/kapat"
};
