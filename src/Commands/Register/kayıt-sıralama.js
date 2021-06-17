const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))
  

 
   let kayıt = await registerdb.get(`veri`);

let map  = Object.keys(kayıt).filter((a) => `${client.users.cache.has(a) ? client.users.cache.get(a) : "Bulunamadı"}`).sort((a,b) => kayıt[b].reg - kayıt[a].reg).slice(0,10)


    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
   ${map.map((a,index) => `**${index+1}.** ${client.users.cache.has(a) ? client.users.cache.get(a) : "Bulunamadı"} : \`${kayıt[a].reg}\``).join("\n")}
    `)
        .setTimestamp()
    message.channel.send(embed)


};

exports.configuration = {
    CommandName: ["sıralama","ksıralama","kayıtsıralama","reg-sıralama","reg-leader"],
    description: "kız olarak kayıt eder.",
    usage: "k @Member <isim> <yaş>"
};
