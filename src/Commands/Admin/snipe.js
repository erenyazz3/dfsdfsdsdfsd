const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("AFK");
const config = require("../../../config.json");
const snipe = require('../../Models/Snipe.js');

exports.run = async (client, message, args) => {

    
if(![config.mod.owner].some(a => message.member.roles.cache.has(a)) && !message.member.hasPermission("ADMINISTRATOR")) return;

let contetn = await registerdb.get(`msg.${message.guild.id}.content`) || "yok"
let autohr = await registerdb.get(`msg.${message.guild.id}.author`) || "yok"


    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
        En son silinen mesaj aşağıda yazmaktadır.
        `)
        .addField(`Mesajı Yazan`,`${client.users.cache.get(autohr)}`,true)
        .addField(`Mesaj`,`${contetn}`,true)
        .setTimestamp()
    message.channel.send(embed)

}

exports.configuration = {
  CommandName: ["snipe","sonsilinenmesaj","son-silinen-mesaj"],
  description: "Son silinen mesajı gösterir.",
  usage: "snipe"
};
