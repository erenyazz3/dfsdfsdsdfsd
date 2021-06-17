const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.ban) && !message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")
   
    let userID = args[0]
    if(!userID) return message.channel.send("Bir kullanıcı idsi girmelisin.");
    message.guild.fetchBans().then(bans=> {
    if(bans.size == 0) return message.channel.send("Sunucuda kimse banlanmamış.")
    let bUser = bans.find(b => b.user.id == userID)
    if(!bUser) return message.channel.send("Bu kullanıcı banlanmamış.")
        let member = client.users.cache.get(userID)
     message.guild.members.unban(member);

    message.react(config.emojis.onay);

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author} ${userID} idli kullanıcının banını kaldırdı.`)
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setFooter(client.user.username,client.user.avatarURL())
client.channels.cache.get(config.channel.banlog).send(embed);

})



};
exports.configuration = {
    CommandName: ["unban"],
    description: "Unban yaparsınız",
    usage: "unban [member]"
};
