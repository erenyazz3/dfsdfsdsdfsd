const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed, MessageManager } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MODERASYON");
const config = require("../../../config.json");
const moment = require("moment");
const ms = require('ms');
const Ceza = require("../../Models/Cezalar")

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.owner) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli izne sahip değilsin.")

    
  function emoji(sayi) {
    var a = sayi.toString().replace(/ /g, "     ");
    var c = a.match(/([0-9])/g);
    a = a.replace(/([a-zA-Z])/g, "Tanımsız").toLowerCase();
    if (c) {
        a = a.replace(/([0-9])/g, t => {
            return {
'0' : `<a:__laynex_0:816256924010020894>`,
'1' : `<a:__laynex_1:816256949292498975>`,
'2' : `<a:__laynex_2:816256982221586452>`,
'3' : `<a:__laynex_3:816257021924999169>`,
'4' : `<a:__laynex_4:816257050115702785>`,
'5' : `<a:__laynex_5:816257083724398592>`,
'6' : `<a:__laynex_6:816257118859558913>`,
'7' : `<a:__laynex_7:816257155999989770>`,
'8' : `<a:__laynex_8:816257259399020565>`,
'9' : `<a:__laynex_9:816257237324136498>`,
            }[t];
        });
    }
    return a;
}

if(!args[0]){
    let embed = new MessageEmbed()
        .setAuthor("Kullanıcı Susturuldu",message.author.avatarURL({dynamic:true}))
        .setDescription(`
       \`>\` Sunucumuzu boostlayan üye sayısı: ${emoji(message.guild.roles.cache.get(config.roles.booster).members.size)}
       \`>\` Sunucumuzda ki boost sayısı: ${emoji(message.guild.premiumSubscriptionCount)}
       \`>\` Sunucumuzun boost seviyesi: ${emoji(message.guild.premiumTier)}
       `)
    message.channel.send(embed);
} 
if(args[0]){
    
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send("Kullanıcı etiketlmeyi unuttun.");
        if(member.premiumSinceTimestamp === 0) return message.channel.send("Bu kullanıcı sunucumuza bir takviye gerçekleştirmemiş.")
      
        let embed = new MessageEmbed()
        .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
        .setDescription(`
      **${member.user.username}** Adlı kullanıcı ${moment(member.premiumSinceTimestamp).format("D/M/YYYY HH:mm")} tarihinden belli sunucumuzu boostluyor.
       `)
    message.channel.send(embed);
    
}
 


};

exports.configuration = {
    CommandName: ["booster","boostsay","booster-say"],
    description: "Sunucudaki boostları sayarsınız.",
    usage: "booster-say"
};
