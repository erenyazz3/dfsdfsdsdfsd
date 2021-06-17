const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.reg) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.").then(a => a.delete({timeout:3000}))

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!harry) return message.reply("Bir kullanıcı girmeyi unuttun.");

let name = args[1];
let age = args[2];
if(!name) return message.channel.forcex("Kullanıcın ismini girmelisin.",message.channel.id);
if(message.author.id === harry.id) return;
if(harry.roles.cache.has("815994259475923023")) return message.channel.send("Kullanıcı zaten kayıt edilmiş.")
    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı kayıt edemissin çünkü aynı roldesiniz veya o senden yüksek rolde.")

if(isNaN(age)) return message.channel.forcex("Yaş girmeyi unuttun!",message.channel.id)


 let taglıalım = await registerdb.get(`taglıalım.${message.guild.id}`) || null;
 if(taglıalım !== null) {
     
    let embedx = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("TAGLI ALIM", message.guild.iconURL({dynamic:true}))
    .setDescription(`Sunucumuz \`TAGLI ALIM\` olduğu için ve isminde (\`${config.sembol.tag}\`) tagımızın olmadığını fark ettim ve ne yazık ki kayıt edemem.`)
  

    if(!harry.user.username.includes("✰") && harry.premiumSinceTimestamp == 0){
        return message.channel.send(embedx);

    } else {
    await registerdb.add(`reg.${harry.id}.erkek`,1);
    await registerdb.add(`veri.${message.author.id}.reg`,1);
    await registerdb.add(`stat.${message.author.id}.erkek`,1);
    await registerdb.set(`isim.${harry.id}`,name);
    await registerdb.set(`age.${harry.id}`,age);
    let tarih = Date.now();
    await registerdb.push(`register.${harry.id}`,{
        rol: "<@&ERKEK ROL İD>",
        user: harry.id,
        mod: message.author.id,
        duration: tarih,
        name: name,
        age: age
    });
 
 await  harry.roles.cache.has("BOOSTER ROL İD") ? harry.roles.set(["BOOSTER ROL İD ","ERKEK ROL İD","ERKEK ROL İD 2","ERKEK ROL İD 3"]) : harry.roles.set(["ERKEK ROL İD 1","ERKEK ROL İD 2","ERKEK ROL İD 3"])

   if(harry.user.username.includes("TAGGGGG")){
    await harry.roles.add("TAGLI ROL İD CREW")

    harry.setNickname(`${config.sembol.tag} ${name} | ${age}`)
} else {
    harry.setNickname(`✦ ${name} | ${age}`)
}

client.channels.cache.get(config.channel.chat).send(`Hey ${harry} \`aramıza hoşgeldin kuralları okumayı unutma!\` `).then(a => a.delete({timeout:4000}))
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
        ${harry} adlı üye <@&ERKEK ROL İD> olarak kaydedildi
        
        kullanıcın eski isimlerine bakmak için \`${config.prefix}isimler @Forcex/İd\` ile bakabilirsin.
        `)
        .setTimestamp()
    message.channel.send(embed);
};
 } else {
 

    await registerdb.add(`reg.${harry.id}.erkek`,1);
    await registerdb.add(`veri.${message.author.id}.reg`,1);
    await registerdb.add(`stat.${message.author.id}.erkek`,1);
    await registerdb.set(`isim.${harry.id}`,name);
    await registerdb.set(`age.${harry.id}`,age);
    let tarih = Date.now();
    await registerdb.push(`register.${harry.id}`,{
        rol: "<@&ERKEK ROL İD>",
        user: harry.id,
        mod: message.author.id,
        duration: tarih,
        name: name,
        age: age
    });

    await  harry.roles.cache.has("BOOSTER ROL İD") ? harry.roles.set(["BOOSTER ROL İD ","ERKEK ROL İD","ERKEK ROL İD 2","ERKEK ROL İD 3"]) : harry.roles.set(["ERKEK ROL İD 1","ERKEK ROL İD 2","ERKEK ROL İD 3"])

 if(harry.user.username.includes("TAGGG")){
         await harry.roles.add("TAGLI ROL İD CREW")

    harry.setNickname(`${config.sembol.tag} ${name} | ${age}`)
} else {
    harry.setNickname(`✦ ${name} | ${age}`)
}

client.channels.cache.get(config.channel.chat).send(`Hey ${harry} \`aramıza hoşgeldin kuralları okumayı unutma!\` `).then(a => a.delete({timeout:4000}))
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
        ${harry} adlı üye <@&ERKEK ROL İD> olarak kaydedildi
        
        kullanıcın eski isimlerine bakmak için \`${config.prefix}isimler @Forcex/İd\` ile bakabilirsin.
        `)
        .setTimestamp()
    message.channel.send(embed);
	


   
}


};

exports.configuration = {
  CommandName: ["e","erkek"],
  description: "erkek olarak kayıt eder.",
  usage: "e @Member <isim> <yaş>"
};
