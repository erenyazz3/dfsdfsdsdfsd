const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {


    if (!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let erkek = await registerdb.get(`stat.${harry.id}.erkek`) || 0;
    let kız = await registerdb.get(`stat.${harry.id}.kız`) || 0;

    let rol = harry.roles.cache.filter(a => a.name !== "@everyone");

    let embed = new MessageEmbed()
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setThumbnail(harry.user.avatarURL({dynamic:true}))
        .setDescription(`
            Profil: ${harry}
            İd: \`${harry.id}\`
            Nickname: **${harry.nickname ? harry.nickname : "Bulunamadı"}**
            Hesabı Oluşturma Tarihi: \`${moment(harry.user.createdAt).format("D/M/YYYY HH:mm:ss")}\`
            Rolleri: ${rol.size >= 8 ? "**Sıralanamadı**" : rol.map(a => a).join(",")}
            
            Toplam Kayıt Sayısı: \`${Number(erkek) + Number(kız)}\`
            Şuana Kadar Toplam Kız Kayıt Sayısı: **${Number(kız)}**
            Şuana Kadar Toplam Erkek Kayıt Sayısı: **${Number(erkek)}**
        `)
        .setTimestamp()
    message.channel.send(embed)

};

exports.configuration = {
    CommandName: ["sorgu"],
    description: "kişinin sorgualrını gösterir.",
    usage: "sorgu [member]"
};
