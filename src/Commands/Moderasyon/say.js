const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

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


   
	message.channel.send(`
	   Valena: ${emoji(message.guild.memberCount)}          Online: ${emoji(message.guild.members.cache.filter(a => a.presence.status !== "offline").size)}\n
                      Family ${emoji(message.guild.members.cache.filter(a => a.user.username.includes(config.sembol.tag)).size)} 
        
	`)
				  
};

exports.configuration = {
  CommandName: ["say"],
  description: "Sunucuda kaç kişi online kaç taglı var onu sayar.",
  usage: "say"
};
