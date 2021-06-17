const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");
const config = require("../../../config.json");
const moment = require("moment");
const ms = require('ms');
const mongoose = require("mongoose");
const Ceza = require("../../Models/Cezalar")
exports.run = async (client, message, args) => {


if(!message.member.roles.cache.has(config.mod.chatmute) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli izne sahip değilsin.")

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.inlineReply("Mutelemek istediğiniz kullanıcı etiketleyin.");
    if(message.author.id === harry.id || harry.user.bot) return;

    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı muteleyemessin çünkü aynı roldesiniz veya o senden yüksek rolde.")

    let süre = args[1]
    if(!süre) return message.inlineReply("Süre girmeyi unuttun.");

    let duration = süre
            .replace(/d/, " gün")
            .replace(/s/, " saniye")
            .replace(/m/, " dakika")
            .replace(/h/, " saat")

    let reason = args.slice(2).join(" ");
    if(!reason) return message.inlineReply("Neden mute atıyorsun.?")

    await harry.roles.add(config.roles.muted).catch(err => {})

            message.react(config.emojis.onay);

        let x = new Ceza({ceza: "CHAT-MUTE", mod: message.author.id, user: harry.id, reason: reason, duration: Date.now()});
        x.save();


let CezaFinishedDate = Date.now() + ms(süre);

const data = await Ceza.find({ user: harry.id }) || [];

    let embed = new MessageEmbed()
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setThumbnail(harry.user.avatarURL({dynamic:true}))
        .addField(`Ceza Bilgisi`,`
        ・Susturan moderatör: ${message.author} (\`${message.author.id}\`)
        ・Susturlan kullanıcı: ${harry} (\`${harry.id}\`)
        ・Cezalandırma tarihi: \`${moment().format("D/M/YYYY HH:mm:ss")}\`
        ・Ceza bitiş: \`${moment(CezaFinishedDate).format("D/M/YYYY HH:mm:ss")}\`
        ・Sebep: **${reason}**
        `)
        .addField(`Ceza Geçmişi`,`
        ${!data.length ? "Kullanıcın ceza geçmişini bulamadım" : data.map((x,index) => `\`${index+1}\`. \`${x.ceza}\`: <@${x.mod}> Tarafından **${x.reason}** nedeniyle atılmış.`).slice(0,7).join("\n")}
        `)
    client.channels.cache.get(config.channel.chatmutelog).send(embed);

    setTimeout(async() => {
        await harry.roles.remove(config.roles.muted).catch(err => {})

        let embed = new MessageEmbed()
            .setAuthor("SUSTURMA KALKTI",message.author.avatarURL({dynamic:true}))
            .setThumbnail(harry.user.avatarURL({dynamic:true}))
            .setDescription(`
            ・Susturlan Kullanıcı: ${harry} (\`${harry.id}\`)
            ・Susturan Moderatör: ${message.author} (\`${message.author.id}\`)
            ・Süre: **${duration}**
            ・Sebep: **${reason}**
        `)
        client.channels.cache.get(config.channel.chatmutelog).send(embed);
    },ms(süre))


};

exports.configuration = {
    CommandName: ["chatmute","mute","chat-mute"],
    description: "kullanıcıyı chat'de mutelersiniz.",
    usage: "chat-mute [member] [süre] [sebep]"
};
