const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const moment = require("moment");
const Ceza = require("../../Models/Cezalar")

exports.run = async (client, message, args) => {


  
  if(!message.member.roles.cache.has(config.mod.jail) && !message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.inlineReply("Sorgusuna bakılcak kullanıcıyı etiketlemelisin. ");

    const CezaGeçmişi =  await Ceza.find({ceza: "JAİL" , user: member.id}) || [];

  let SorguMap = CezaGeçmişi.map((a,i) => `**[${a.ceza}]**: <@${a.mod}> Tarafından **${a.reason}** sebebiyle \`${moment(a.duration).format("D/M/YYYY HH:mm:ss")}\` jaile gönderilmiş. `)

    let embed = new MessageEmbed()
    .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
   ${!CezaGeçmişi.length ? "**Bu kişinin jail cezaları bulamadım.**" : SorguMap.slice(0,12).join("\n")}
         `)
         .setFooter("Forcex ❤️ Darkside",member.user.avatarURL({dynamic:true}))
    message.channel.send(embed)
};

exports.configuration = {
    CommandName: ["jail-sorgu","jailsorgu"],
    description: "Kullanıcın jail geçmişine bakarsınız.",
    usage: "jail-sorgu [member]"
};
