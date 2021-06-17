const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {


    if (!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.channel.send("Kayıtsıza gönderilcek kullanıcıyı etiketlemelisin.");
    if(message.author.id === harry.id) return;

    let name =  await registerdb.get(`isim.${harry.id}`);
    let age = await registerdb.get(`age.${harry.id}`);
    if(!name && !age) return message.reply("Gönderilcek kişinin kayıt verisini bulamadığım için onu kayıtsıza gönderemem.");

let sebep = args.slice(1).join(" ");
if(!sebep) return message.channel.send("Kayıtsıza atmak için bir sebep girmelisin.")

    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı atamassın çünkü aynı roldesiniz veya o senden yüksek rolde.")

    message.react(config.emojis.onay);

   let truefalse =  harry.roles.cache.has("KAYITSIZ ROL İD");
   if(truefalse == true){
       harry.roles.set([config.roles.unregister,config.roles.booster])
   } else {
       harry.roles.set([config.roles.unregister])
   }
   let embed = new MessageEmbed()
   .setColor("RANDOM")
   .setDescription(`${harry} adlı kullanıcı kayıtsıza atıldı.`)
   .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
   .addField(`Moderatör`,`${message.author} (\`${message.author.id}\`) `)
 .addField(`Kullanıcı`,`${message.author} (\`${message.author.id}\`) `)
client.channels.cache.get("LOG KANAL İD").send(embed)

    await registerdb.push(`register.${harry.id}`,{
        rol: "Kayıtsız Komutu",
        user: harry.id,
        mod: message.author.id,
        duration: Date.now(),
        name: name,
        age: age
    });

  setTimeout(async() => {
      await registerdb.delete(`age.${harry.id}`)
      await registerdb.delete(`isim.${harry.id}`)
  },3000)


};

exports.configuration = {
    CommandName: ["kayıtsız","unregister"],
    description: "kişinin tüm rollerini alır ve kayıtsıza atar.",
    usage: "kayıtsız [member]"
};
