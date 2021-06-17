const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const moment = require("moment");
const Ceza = require("../../Models/Cezalar")

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.ban) && !message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.channel.send("Bir kullancıyı etiketleyin veya idsini girin.")
    if(harry.user.bot || message.author.id === harry.user.id) return;

    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı banlayamassın çünkü aynı roldesiniz veya o senden yüksek rolde.")

    let sa = args.slice(1).join(" ");
    if(!sa) return message.channel.send("Ban atmak için bir sebep girmelisin");


    harry.ban({reason:sa}).catch(err => {})


    let x = new Ceza({ceza: "BAN", mod: message.author.id, user: harry.id, reason: sa, duration: Date.now()});
    x.save();

    message.react(config.emojis.onay);

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` ${harry} (\`${harry.id}\`) adlı kullanıcı ${message.author} tarafından **${sa}** sebebiyle banladı.`)
        .setAuthor("Bir Kullanıcı Banlandı!",message.author.avatarURL({dynamic:true}))
        .setFooter(client.user.username,client.user.avatarURL())
client.channels.cache.get(config.channel.banlog).send(embed);


};
exports.configuration = {
    CommandName: ["ban","yargı"],
    description: "kullanıcıyı banlarsınız.",
    usage: "ban [member] [sebep]"
};
