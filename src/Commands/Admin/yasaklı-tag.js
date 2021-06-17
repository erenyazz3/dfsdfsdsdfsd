const { MessageEmbed } = require("discord.js");
const Database = require("../../Models/Yasaklı-taglar.js");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.owner) && !message.member.hasPermission("ADMINISTRATOR")) return;

if(!args[0]) return message.channel.send("Argüman girmeyi unuttun. `listele/ekle/çıkar`");

if(args[0] === "listele"){
    let taglars =  await Database.find({GuildID: message.guild.id}) || [];
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`

${!taglars.length ? "**Sistemde hiç yasaklı tag bulunamadı**"  : taglars.map((item,a) => `\`${a+1}\`. **${item.Tag}** Adlı tag <@${item.mod}> tarafından eklenmiş. `).join("\n")}
        `)
        .setTimestamp()
    message.channel.send(embed)
};

if(args[0] === "ekle") {
    let tag = args[1];
    if(!tag) return message.channel.send("Tag girmeyi unuttun!");
let varmı  =  await Database.find({GuildID: message.guild.id}) || [];
let varmı2 = varmı.find(a => a.Tag === tag);
if(varmı2 !== undefined) return message.channel.send("Ne yazık ki bu tag önceden eklenmiş.")
    message.channel.send(`${tag} Başarıyla yasaklı taglar listesine eklendi.`);
    
    let newData = new Database({GuildID: message.guild.id,Tag: tag, mod: message.author.id});
newData.save()

}

if(args[0] === "çıkar" || args[0] === "kaldır"){
    let tag = args[1];
    if(!tag) return message.channel.send("Çıkarmak istediğiniz tagı giriniz!");

  let tags =  await Database.find({GuildID: message.guild.id});
 let varmı = tags.find(a => a.Tag === tag);
 if(varmı === undefined){
     message.channel.send("Sistemde böyle bir tag bulamadım.");
 } else {
 message.channel.send(`\`${tag}\` Tag başarılı bir şekilde yasaklı taglar listesinden çıkarıldı.`)
 let x =  tags.filter(a => a.Tag !== tag);
 await Database.findOneAndUpdate({GuildID: x.GuildID, Tag: x.Tag, mod: x.mod});
 }
}

}

exports.configuration = {
  CommandName: ["yasaklıtag","yasaklı-tag","ytag"],
  description: "Yasaklı tag ekler veya çıkarırsınız.",
  usage: "yasaklı-tag `listele/ekle/çıkar`"
};
