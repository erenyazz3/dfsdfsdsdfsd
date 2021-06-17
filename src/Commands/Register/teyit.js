const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;


let erkek = await registerdb.get(`stat.${harry.id}.erkek`) || 0
let kadın = await registerdb.get(`stat.${harry.id}.kız`) || 0

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
      ${harry} toplam **${Number(erkek) + Number(kadın)}** kayıt yapmış (**${erkek}** erkek, **${kadın}** kadın)
        `)
        .setFooter("Valena Developed by Forcex")
    message.channel.send(embed);


};

exports.configuration = {
  CommandName: ["teyit","kayıt"],
  description: "erkek olarak kayıt eder.",
  usage: "e @Member <isim> <yaş>"
};
