const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");
const config = require("../../../config.json");
const moment = require("moment");
const Ceza = require("../../Models/Cezalar")

exports.run = async (client, message, args) => {


    if( !message.member.roles.cache.has(config.mod.kick) && !message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.inlineReply("Bir kullancıyı etiketleyin veya idsini girin.")
    if(harry.user.bot || message.author.id === harry.user.id) return;

    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı kickleyemessin çünkü aynı roldesiniz veya o senden yüksek rolde.")

    let reason = args.slice(1).join(" ");
    if(!reason) return message.inlineReply("Kick atmak için bir sebep girmelisin");


    await harry.kick().catch(err => {})


   
    let Sicil = new Ceza({ceza: "KİCK", mod: message.author.id, user: member.id, reason: sebep, duration: Date.now()});
    Sicil.save();


    message.react(config.emojis.onay);

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author} ${harry} (\`${harry.id}\`) adlı kullanıcı ${message.author} tarafından **${reason}** sebebiyle kicklendi.`)
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setFooter(client.user.username,client.user.avatarURL())
    client.channels.cache.get(config.channel.kicklog).send(embed);


};
exports.configuration = {
    CommandName: ["kick"],
    description: "kullanıcıyı kicklersiniz.",
    usage: "kick [member] [sebep]"
};
