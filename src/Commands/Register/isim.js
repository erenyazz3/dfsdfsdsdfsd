const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))
    let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!harry) return message.reply("Bir kullanıcı girmeyi unuttun.");
    if(message.author.id === harry.id) return;
    if(!harry.roles.cache.has("ERKEK ROL İD 1") && !harry.roles.cache.has("ERKEK ROL İD 2")) return message.channel.send("Bu kullanıcı kayıt edilmediği için ne yazık ki ismini değiştiremem.")
    let name = args[1];
    let age = args[2];
    if(!name) return message.channel.forcex("Kullanıcın ismini girmelisin..",message.channel.id);
    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı kayıt edemissin çünkü aynı roldesiniz veya o senden yüksek rolde.")
    if(isNaN(age)) return message.channel.forcex("Yaş girmeyi unuttun!",message.channel.id)


    let tarih = Date.now();

   let kayıt = await registerdb.get(`register.${harry.id}`) || undefined;

   if(kayıt  === undefined){
    message.react(config.emojis.onay);

    if(harry.user.username.includes("TAGGGGGGG")){
    harry.setNickname(`${config.sembol.tag} ${name} | ${age}`).catch(err => {})
} else {
    harry.setNickname(`✦ ${name} | ${age}`).catch(err => {})
}
    await registerdb.set(`isim.${harry.id}`,name);
    await registerdb.set(`age.${harry.id}`,age);
    let tarih = Date.now();
    await registerdb.push(`register.${harry.id}`,{
        rol: "İsim Komutu",
        user: harry.id,
        mod: message.author.id,
        duration: tarih,
        name: name,
        age: age
    });

   } else {
    if(harry.user.username.includes("✰")){
        harry.setNickname(`${config.sembol.tag} ${name} | ${age}`).catch(err => {})
    } else {
        harry.setNickname(`✦ ${name} | ${age}`).catch(err => {})
    }
    
       message.react(config.emojis.onay)

    await registerdb.set(`isim.${harry.id}`,name);
    await registerdb.set(`age.${harry.id}`,age);
   
    let sonveri =[ kayıt[kayıt.length - 1]]
    const mappedItems = sonveri.map((item) => {
        if (sonveri) {
          item.age = age;
        item.name = name

      registerdb.set(`register.${harry.id}`, kayıt)
        } else {
          return item;
        }
      });

   }
     
};

exports.configuration = {
    CommandName: ["isim"],
    description: "kız olarak kayıt eder.",
    usage: "k @Member <isim> <yaş>"
};
