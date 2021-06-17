const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.hasPermission("MESSAGE_DELETE") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yeterli yetkin bulunamadığı için bu komutu kullanamasın.").then(a => a.delete({timeout:4000}))

let miktar = args[0]
if(isNaN(miktar)) return message.reply("Silincek mesaj miktarını girmelisin.")

message.channel.bulkDelete(miktar).then(a => {
    message.channel.send(`Toplam **${a.size}** adet mesaj silindi!`).then(x=>x.delete({timeout:3000}))
})
  
}

exports.configuration = {
  CommandName: ["sil","temizle","sıl"],
  description: "Girilen miktar kadar mesaj siler.",
  usage: "sil [Miktar]"
};
