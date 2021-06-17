const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MODERASYON");
const config = require("../../../config.json");
const moment = require("moment");
const ms = require('ms');
const Ceza = require("../../Models/Cezalar")

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.vmute) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli izne sahip değilsin.")

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.channel.send("Mutelemek istediğiniz kullanıcı etiketleyin.");
    if(message.author.id === harry.id || harry.user.bot || !harry.voice.channel) return message.react(config.emojis.red)
    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı muteleyemessin çünkü aynı roldesiniz veya o senden yüksek rolde.")

    let süre = args[1];
    if(!süre) return message.channel.send("Süre girmeyi unuttun.");
    let duration = süre
        .replace(/d/, " gün")
        .replace(/s/, " saniye")
        .replace(/m/, " dakika")
        .replace(/h/, " saat")

    let reason = args.slice(2).join(" ");
    if(!reason) return message.channel.send("Neden mute atıyorsun?");

    message.react("🔇");
     await harry.voice.setMute(true);

     let x = new Ceza({ceza: "VOİCE-MUTE", mod: message.author.id, user: harry.id, reason: reason, duration: Date.now()});
     x.save();

     let CezaFinishedDate = Date.now() + ms(süre);

    let embed = new MessageEmbed()
        .setAuthor("Kullanıcı Susturuldu",message.author.avatarURL({dynamic:true}))
        .setThumbnail(harry.user.avatarURL({dynamic:true}))
        .setDescription(`
        **${harry.user.username}** Adlı **${harry.voice.channel.name}** adlı kanalda susturuldu

       Susturlan Kullanıcı: ${harry} (\`${harry.id}\`)
       Susturan Moderatör: ${message.author} (\`${message.author.id}\`)
       Ceza başlangıç tarihi: \`${moment().format("D/M/YYYY HH:mm:ss")}\`
       Ceza bitiş tarihi: \`${moment(CezaFinishedDate).format("D/M/YYYY HH:mm:ss")}\`
       Süre: **${duration}**
       Sebep: **${reason}**
        `)
    client.channels.cache.get(config.channel.vmutelog).send(embed);

    setTimeout(async() => {
        await harry.voice.setMute(false);

        let embed = new MessageEmbed()
            .setAuthor("SUSTURMA KALKTI")
            .setThumbnail(harry.user.avatarURL({dynamic:true}))
            .setDescription(`
       Sesde Susturulan Kullanıcı: ${harry} (\`${harry.id}\`)
       Susturan Moderatör: ${message.author} (\`${message.author.id}\`)
       Süre: **${duration}**
       Sebep: **${reason}**
        `)
        client.channels.cache.get(config.channel.vmutelog).send(embed);
    },ms(süre))


};

exports.configuration = {
    CommandName: ["vmute","voicemute","voice-mute"],
    description: "kullanıcıyı ses'de mutelersiniz.",
    usage: "voice-mute [member] [süre] [sebep]"
};
