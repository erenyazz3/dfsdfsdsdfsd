const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");
const config = require("../../../config.json");
const moment = require("moment");
const ms = require('ms');
const Ceza = require("../../Models/Cezalar")

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.jail)  && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli izne sahip değilsin.")

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.channel.send("Sicilene bakmak istediğiniz kullanıcı etiketleyin.");
    if(harry.user.bot) return;


    const SonCeza =  await Ceza.findOne({user: harry.id}) || {ceza: "yok", mod: "yok",  reason: "yok", duration: 0};
    const CezaGeçmişi =  await Ceza.find({ user: harry.id}) || [];

let CezaMap = CezaGeçmişi.map((a,i) => `\`${i+1}.\` **[${a.ceza}]**: <@${a.mod}> tarafından \`${moment(a.duration).format("D/M/YYYY HH:mm:ss")}\` tarinde **${a.reason}** sebebiyle atılmış. `)

        let embed = new MessageEmbed()
            .setAuthor(client.user.username,client.user.avatarURL({dynamic:true}))
            .setThumbnail(harry.user.avatarURL({dynamic:true}))
            .setDescription(`
            :arrow_down: ${harry} Üyennin ceza geçmişi aşağıda yazmaktadır

          ${CezaMap.slice(0,10).join("\n")}
            `)
            .addField(`Ceza Bilgisi`,`
            Toplam Cezası: \`${CezaGeçmişi.length}\`
            `)
            .addField(`Kullanıcın İlk Cezası`,`**${SonCeza.ceza === "yok" ? "Ceza Bulunamadı" : `[${SonCeza.ceza}]`}** ${SonCeza.mod === "yok" ? "**Yetkili Bulunamadı**" : `<@${SonCeza.mod}>`} tarafından **${SonCeza.reason === "yok" ? "Sebep Bulunamadı" : SonCeza.reason}** sebebiyle \`${SonCeza.duration === 0 ?  "Tarih Bulunamadı" :  moment(SonCeza.duration).format("D/M/YYYY HH:mm:ss")}\` tarihinde atılmış.`)
        message.channel.send(embed);


};

exports.configuration = {
    CommandName: ["sicil","cezalar"],
    description: "kullanıcın cezalarını gösterir.",
    usage: "sicil [member]"
};
