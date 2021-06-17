const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");
const moment = require("moment");
const mongoose = require("mongoose");
const Ceza = require("../../Models/Cezalar")
const moderasyondb = DatabaseManager.getDatabase("MOD");

exports.run = async (client, message, args) => {


    if( !message.member.roles.cache.has(config.mod.jail) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.inlineReply("Jaile atılcak kullanıcıyı etiketlemeyi unuttun.");
    if(member.user.bot || member.id === message.author.id) return;
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı atamassın çünkü aynı roldesiniz veya o senden yüksek rolde.")

    let sebep = args.slice(1).join(" ");
    if(!sebep) return message.inlineReply("Jaile atma sebebin nedir.");

    let Sicil = new Ceza({ceza: "JAİL", mod: message.author.id, user: member.id, reason: sebep, duration: Date.now()});
    Sicil.save();

    await moderasyondb.set(`jaıxdd.${member.id}`,"JAİL");

member.roles.cache.has(config.roles.booster) ? member.roles.set([config.roles.jail,config.roles.karantina,config.roles.booster]) : member.roles.set([config.roles.jail,config.roles.karantina])
member.setNickname(null);

message.channel.send(`**${member.user.username}** (\`${member.id}\`) adlı üye sorunsuz bir şekilde jaile gönderildi.`);
const CezaGeçmişi =  await Ceza.find({ceza: "JAİLCEZA" , user: member.id});

    let embed = new MessageEmbed()
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
        ${member} (\`${member.id}\`) adlı kullanıcı ${message.author} tarafından jaile atıldı.
         
         Jaile atılan kullanıcı: ${member} (\`${member.id}\`)
         Cezalandırma tarihi: \`${moment().format("D/M/YYYY HH:mm:ss")}\`
         Jaile atılma sebebi: **${sebep}**
        Kaç kere jaile gönderilmiş: \`${CezaGeçmişi.length == 0 ? "Kullanıcı hiç jaile atılmamış" : CezaGeçmişi.length}\`
         `)
    client.channels.cache.get(config.channel.jailog).send(embed)
};

exports.configuration = {
    CommandName: ["jail","cezalı"],
    description: "kullancıyı jaile atar.",
    usage: "jail [member] [sebep]"
};

