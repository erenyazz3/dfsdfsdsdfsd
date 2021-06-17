const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");
const moment = require("moment");
const mongoose = require("mongoose");
const Ceza = require("../../Models/Cezalar")
   
exports.run = async (client, message, args) => {


    if( !message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu komutu kullanamak için yeterli yetkin bulunmamaktadır.")


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

    let embed = new MessageEmbed()
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
	 <:_Valena_tag:816230956514934794>  Valena Ses Bilgisi
	 
    **Sesdeki üye sayısı:** ${emoji(message.guild.members.cache.filter(a => a.voice.channel).size)}
	**Public voice:** ${emoji(message.guild.members.cache.filter(a => a.voice.channel && a.voice.channel.parentID === "PUBLİC KATEGORİ İD").size)}
	**Staff voice:** ${emoji(message.guild.members.cache.filter(a => a.voice.channel && a.voice.channel.parentID === "STAFF KATEGORİ İD").size)}
	**Register voice:** ${emoji(message.guild.members.cache.filter(a => a.voice.channel && a.voice.channel.parentID === "REGİSTER KATEGORİ İD").size)}
	**Private voice:** ${emoji(message.guild.members.cache.filter(a => a.voice.channel && a.voice.channel.parentID === "PRİVATE KATEGORİ İD").size)}
         `)
		 .setFooter(message.guild.name,message.guild.iconURL({dynamic:true}))
  message.channel.send(embed)
};

exports.configuration = {
    CommandName: ["ses"],
    description: "sesdeki üye sayısını gösterir.",
    usage: "ses"
};

