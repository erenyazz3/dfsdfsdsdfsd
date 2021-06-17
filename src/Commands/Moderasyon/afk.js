const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const afkdb = DatabaseManager.getDatabase("AFK");
const config = require("../../../config.json");
const moment = require("moment");


exports.run = async (client, message, args) => {


  let kisi =   await afkdb.get(`afk.${message.author.id}.user`);

    if (kisi) return;
    const sebep = args[0];
    if (!args[0]) {
        let kullanıcı = message.guild.members.cache.get(message.author.id);
        const b = kullanıcı.displayName;
        let ax = message.member

     await afkdb.set(`afk.${message.author.id}.user`,message.author.id);
     await afkdb.set(`afk.${message.author.id}.sebep`,"Sebep Girilmemiş");
     await afkdb.set(`afk.${message.author.id}.name`,b);
        await afkdb.set(`afk.${message.author.id}.süre`,Date.now());

     message.reply("artık `AFK` modundasın.")

        ax.setNickname(`[AFK] ` + b).catch(er => {})
    }
    if (args[0]) {
        let sebep = args.join(" ");
        let kullanıcı = message.guild.members.cache.get(message.author.id);
        const b = kullanıcı.displayName;

        await afkdb.set(`afk.${message.author.id}.user`,message.author.id);
        await afkdb.set(`afk.${message.author.id}.sebep`,sebep);
        await afkdb.set(`afk.${message.author.id}.name`,b);
        await afkdb.set(`afk.${message.author.id}.süre`,Date.now());

        message.reply(`artık \`AFK\` modundasın.`);

        message.member.setNickname(`[AFK] ` + b).catch(er => {})
    }
};

exports.configuration = {
    CommandName: ["afk"],
    description: "kullanıcıyı banlarsınız.",
    usage: "ban [member] [sebep]"
};
