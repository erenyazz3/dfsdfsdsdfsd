
const { Client,Collection,WebhookClient,MessageEmbed } = require('discord.js');
const fs = require('fs');
require("./src/inlinereply.js");
const config = require('./config.json');
const Token = require('./token.json');
const moment = require('moment');
const client = global.Client = new Client({
  fetchAllMembers: true
});
const Ceza = require('./src/Models/Cezalar.js')
const {DatabaseManager,Database} = require('@aloshai/mongosha')
const registerdb = DatabaseManager.getDatabase("KAYIT");

DatabaseManager.connect("MONGO DB URLLLLLLLLLLL")

const afkdb = DatabaseManager.getDatabase("AFK");
const mongoose = require("mongoose");
require("moment-duration-format")
const Yasaklıt = require("./src/Models/Yasaklı-taglar.js");
const snipe = require("./src/Models/Snipe.js");
///Prototype
require("./src/Prototype/TextChannel.js");
require("./src/Prototype/Array.js");
const moderasyondb = DatabaseManager.getDatabase("MOD");

mongoose.connect("MONGODB URL",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})


client.aliases = new Collection();
fs.readdirSync('./src/Commands').forEach(a => {
    const commandFiles = fs.readdirSync(`./src/Commands/${a}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
      const komutlar = require(`./src/Commands/${a}/${file}`);
    
      komutlar.configuration.CommandName.forEach(alias => {
          console.log(`[Commands] : ${alias}`)
        client.aliases.set(alias,komutlar);
      });
    }
  }) 

  fs.readdir("./src/Events", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./src/Events/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

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



client.on("ready",  async() => {
  console.log("[Ready] Bot hazır!");
  let channel =  client.channels.cache.get("VOİCE KANAL İD")
  let guild = client.guilds.cache.get(config.serverId);
  try {
  channel.join()
  } catch(d) {
      console.log("Ses kanalını bulamadığım için kanala giriş yapamadım!")
  }

  client.user.setPresence({activity: {name: config.presence},status: "online"});
  setInterval(() => {
  
	  client.channels.cache.get("CHAT KANAL ID").setTopic(`
  Valena: ${emoji(guild.memberCount)}  Online: ${emoji(guild.members.cache.filter(a => a.presence.status !== "offline").size)}         Family: ${emoji(guild.members.cache.filter(a => a.user.username.includes("✰")).size)} 
                           
  `)
	  
  },8000)
})


    client.login(Token.token);

    client.on("message", async(message) => {
	
      let client = message.client;
      if (message.author.bot) return;
      if (!message.content.startsWith(config.prefix)) return;
      let command = message.content.split(' ')[0].slice(config.prefix.length);
      let params = message.content.split(' ').slice(1);
      let cmd;
      if (client.aliases.has(command)) {
        cmd = client.aliases.get(command);
      } else{
        return;
      }
        cmd.run(client, message, params);
    })

client.on('guildMemberRemove', async(member) => {
	
  if(member.user.bot) return;
  if(member.roles.cache.has(config.roles.jail)){
    await registerdb.set(`jail.${member.id}`,'JAİL');
  }
   let name =  await registerdb.get(`isim.${member.id}`);
   let age =  await registerdb.get(`age.${member.id}`);
    if(!name) return;
    if(!age) return;

    await registerdb.push(`register.${member.id}`,{
        rol: "Sunucudan Ayrılma",
        user: member.id,
        mod: client.user.id,
        duration: Date.now(),
        name: name,
        age: age
    });

    await registerdb.delete(`isim.${member.id}`);
 await registerdb.delete(`age.${member.id}`);

})


client.on("guildMemberAdd", async(member) => {

  if(member.user.bot) return;
    const webhookClient = new WebhookClient("WEBHOOK İD","WEBHOOK TOKEN")
    const kurulus = new Date().getTime() - member.user.createdAt.getTime();
    const gecen = moment.duration(kurulus).format(` **YY** [Yıl,] **DD** [Gün,] **HH** [Saat,] **mm** [Dakika,] **ss** [Saniye]`)
    var kontrol; 
   let array =  await Yasaklıt.find({GuildID: member.guild.id}) || [];
    let Taglar =  array.map(a => a.Tag)
   let varmı1 =  Taglar.includes(r => member.user.username(r))
  let selam =  await moderasyondb.get(`jaıxdd.${member.id}`)|| null;


    let yasaklı = member.user.discriminator.includes("YASAKLI ETİKET"); //SAYI OLARAK GİRİN. # girmeyin.



    if(varmı1 === true || yasaklı === true){
       client.channels.cache.get(config.channel.welcomeID).send(`<a:__Valena_bot:816261182087495681> ${member} adlı üye yasaklı taglardan birini aldığı için jaile atıldı.`).catch(err => {})
       member.send(`İsminde yasaklı taglarlardan biri olduğu için jaile atıldın!`).catch(err => {})
  await member.roles.set([config.roles.yasaklıtag,config.roles.karantina]).catch(err => {})
  client.channels.cache.get(config.channel.yasaklıtaglog).send(`${member} adlı üye yasaklı taglardan birini aldığı için jaile atıldı.`).catch(err => {})

     } else if(selam !== null) {

      member.send(`Jail kaydın devam ettiği için seni jaile attım.`).catch(err => {})
      await member.roles.set([config.roles.jail,config.roles.karantina]).catch(err => {})

      client.channels.cache.get(config.channel.welcomeID).send(`:warning:  ${member} Kullanıcın jail kaydı devam ettiği için jaile atıldı..`).catch(err => {})

     }
     else if (kurulus < 1296000000){ 
      kontrol = 'şüpheli' 
     await member.roles.set([config.roles.jail,config.roles.karantina]).catch(err => {})
     
webhookClient.send(`<a:__Valena_bot:816261182087495681> ${member} adlı üye **şüpheli** gözünktüğü için jaile atıldı.`);
      } else {
 
      kontrol = 'güvenli'
      
  await member.roles.add([config.roles.unregister]).catch(err => {})


moment.locale("tr");

   await webhookClient.send(`
  <a:_Valena_Yldz:816260240340287559> ${member} **Sunucumuza hoşgeldin.** <a:_Valena_Yldz:816260240340287559>
  <a:_Valena_kalp:816260345164333056> Seninle beraber Sunucumuz ${emoji(member.guild.memberCount)} kişiye ulaştı.
  <a:_Valena_ay:816261523893649460> Hesabın ${moment(member.user.createdAt).format("D MMMM YYYY HH:mm")} (\`${moment(member.user.createdAt).fromNow()}\`) tarhinde oluşturulmuş. ${kontrol === "şüpheli" ? "<a:__Valena_bot:816261128346140672>" : "<a:__Valena_bot:816261182087495681>"}

   <@&${config.mod.reg}> Rolündekiler yetkililer seninle ilgilencektir :tada:
   
   **Kayıt olduktan sonra kuralları okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünede bulundurarak yapacağız.**

   `).catch(err => {})
  };
  
   
})


client.on("message", async(msg) => {

if(msg.author.bot) return;
  if(msg.content.toLowerCase() == "tag" || msg.content.toLowerCase() === "!tag" || msg.content.toLowerCase() === ".tag"){
    msg.channel.send(`${config.sembol.tag}`).catch(err => {})
  }
})

client.on("messageDelete", async(msg) => {
  if(msg.author.bot) return;
	
  await afkdb.set(`msg.${msg.guild.id}.content`,msg.content);
  await afkdb.set(`msg.${msg.guild.id}.author`,msg.author.id);

let embed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`:warning: Bir mesaj silindi :warning: `)
.addField(`Yazan Kişi`, msg.author,true)
.addField(`Kanal`, msg.channel,true)
.addField(`Mesaj İçeriği`, msg.content)
client.channels.cache.get(config.channel.mesajlog).send(embed)
})

client.on("voiceStateUpdate", async(n,o) => {
	
	
  if(!o.channelID && n.channelID){
	  let embed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor("BİR KANALDAN ÇIKIŞ YAPILDI")
.setDescription(`${n.member} adlı üye **${n.channel.name}** adlı kanaldan çıkış yaptı.!`)
    client.channels.cache.get(config.channel.seslog).send(embed)
  } 
   if(o.channelID && n.channelID){
	   let embedx = new MessageEmbed()
.setColor("RANDOM")
.setAuthor("BİR KANALA GİRİŞ YAPILDI")
.setDescription(`${n.member} adlı üye **${n.channel.name}** kanalından **${o.channel.name}** kanalına giriş yaptı.!`)
    client.channels.cache.get(config.channel.seslog).send(embedx)
	
 } 
   if(o.channelID && !n.channelID){
	    let embedx = new MessageEmbed()
.setColor("RANDOM")
.setAuthor("BİR KANALA GİRİŞ YAPILDI")
.setDescription(`${o.member} adlı üye **${o.channel.name}** kanala giriş yaptı.!`)
    client.channels.cache.get(config.channel.seslog).send(embedx)
	
  }
})

client.on("userUpdate", async user => {
	
	
	let ax = config.serverId;
	if(user.bot) return;
	let x = client.guilds.cache.get(ax).members.cache.get(user.id);
	if(x.roles.cache.has(config.roles.unregister)) return;
	if(x.roles.cache.has(config.roles.jail)) return;
	if(x.roles.cache.has(config.roles.yasaklıtag)) return;
  let sunucuid = config.serverId;
  let tag = "TAGGGGGG";
  let rol = config.roles.family;
let channel = client.guilds.cache
    .get(sunucuid)
    .channels.cache.find(x => x.id == "LOG KANAL İD");
  const isim = client.guilds.cache.get(sunucuid).members.cache.get(user.id).displayName;
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.cache.get(sunucuid).members.cache.get(user.id);
  if (!member) return;
  if (!member.roles.cache.has(rol)) {
    if (member.user.username.includes(tag)) {
      const dgsckism = isim.replace(tag,"✰");
      await member.setNickname(dgsckism);
      await member.roles.add(rol);
      const tagalma = new MessageEmbed()
	  .setAuthor(member.user.username,member.user.avatarURL({dynamic:true}))
        .setColor("RANDOM")
        .setDescription(`
        <a:_Valena_pikau:816256581657559070>  <@${user.id}> adlı üye \`${tag}\` tagını aldığından dolayı <@&${rol}> rolü verildi 
        `)
			.setFooter("Ailimize Hoşgeldin Dostum")
      await channel.send(tagalma);
    }
  } else {
    if (!member.user.username.includes(tag)) {
      const dgsckism = isim.replace("✰", "✰");
   if(member.roles.cache.has("816044969939697674")) {
     member.roles.set(["815994259475923015","816044969939697674"]) 
   } else {
    member.roles.set(["815994259475923015"])
   }
    member.setNickname(null).catch(err => {});
      const tagsilme = new MessageEmbed()
        .setColor("RANDOM")
		.setAuthor(member.user.username,member.user.avatarURL({dynamic:true}))
        .setDescription(`
        <a:_Valena_insanck:816309341090086912> <@${user.id}> adlı üye \`${tag}\` tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti. 
        `)
		.setFooter("Ailimize yine bekleriz dostum")
     await channel.send(tagsilme);
    }
  }
});



client.on("userUpdate", async(n,o) => {
  if(o.bot) return;
  let GetDatabase =  await Yasaklıt.find({GuildID: config.serverId});
  let DatabaseMap = GetDatabase.map(a => a.Tag);
 
if(o.username !== n.username){
  let YasaklıTaglar = DatabaseMap.includes(r => n.username(r));
 console.log(YasaklıTaglar)
if(YasaklıTaglar == true){
	n.send("İsminde yasaklı taglardan biri bulunduğu için seni jaile gönderiyorum").catch(err => {});
	 let server = client.guilds.cache.get(config.serverId);
let member = server.members.cache.get(n.id);
member.roles.cache.has(config.roles.booster) ? member.roles.set([config.roles.yasaklıtag,config.roles.karantina,config.roles.booster]) : member.roles.set([config.roles.yasaklıtag,config.roles.karantina])
client.channels.cache.get(config.channel.yasaklıtaglog).send(`${member} adlı üye yasaklı taglardan birini aldığı için jaile atıldı.`);
}

}

if(o.discriminator !== n.discriminator){
  let yasaklı = n.discriminator.includes("2018");

 
  if(yasaklı === true){

    client.channels.cache.get(config.channel.welcomeID).send(`${member} adlı üye yasaklı taglarmızdan birini bulundurduğu için jaile atıldı.`)
    let server = client.guilds.cache.get(config.serverId);
    let member = server.members.cache.get(n.id);
    member.roles.cache.has(config.roles.booster) ? member.roles.set([config.roles.yasaklıtag,config.roles.karantina,config.roles.booster]) : member.roles.set([config.roles.yasaklıtag,config.roles.karantina])
    client.channels.cache.get(config.channel.yasaklıtaglog).send(`${member} adlı üye etiketine \`2018\` yazdığı için jaile atıldı.`);
  }

}
})



client.on("message" , async message => {

  let afk = message.mentions.users.first()

 let kisi =  await afkdb.get(`afk.${message.author.id}.user`);
  let isim = await afkdb.get(`afk.${message.author.id}.name`);

  if(afk){
      let sebep = await afkdb.get(`afk.${afk.id}.sebep`);
      let kisi3 = await afkdb.get(`afk.${afk.id}.user`);
      let süre = await afkdb.get(`afk.${afk.id}.süre`);
 

      if(message.content.includes(kisi3)){

          if(message.author.bot) return;

          let embed  =  new MessageEmbed()
              .setColor("#f0fc00")
              .setAuthor(`${message.author.username}`,message.author.avatarURL({dynamic:true}))
              .setDescription(`
              ${afk} adlı kullanıcı **${sebep}** nedeniyle \`AFK\`
              `)
        message.channel.send(embed).then(a => a.delete({timeout:5000}))    
         }

   }   if(message.author.id === kisi){

    message.reply(`Artık \`AFK\` modunda değilsin. `).then(a => a.delete({timeout:5000}))

      await afkdb.delete(`afk.${message.author.id}.user`);
     await afkdb.delete(`afk.${message.author.id}.name`);
   await afkdb.delete(`afk.${message.author.id}.sebep`);
       await afkdb.delete(`afk.${message.author.id}.süre`);
       message.member.setNickname(isim)

   }

 });
let Chat = 0;

const ilitfat = [
 "Bir gülüşün etrafa ışıklar saçtığını sen de gördüm. ",
  "Bu kadar güzel gülme! Masumluğun kıskandırıyor melekleri!",
  "Seninle aynı yüzyılda yaşamak bile benim en büyük şansım.",
  "Aklımda işin yok, durup durup aklıma gelme! Yanıma gel, mevzu kalbimde",
  "O kadar güzelsin ki gözlerimi senden alamıyorum",
  "Yanaklarından bir ısırık alabilirmiyim?",
  "Her gece yatmadan önce seni düşünüyorum.",
  "Bu gece seni düşünmekten gözüme uyku girmedi.",
  "Ne kadar tatlı şeysin sen öyle.",
  "Öpüyorum gökyüzü gibi bakan gözlerinden... ",
  "Bir gülüşün etrafa ışıklar saçtığını sen de gördüm. ",
  "Bu kadar güzel gülme! Masumluğun kıskandırıyor melekleri!",
  "Seninle aynı yüzyılda yaşamak bile benim en büyük şansım.",
  "Aklımda işin yok, durup durup aklıma gelme! Yanıma gel, mevzu kalbimde",
  "O kadar güzelsin ki gözlerimi senden alamıyorum",
  "Bu gece kalbim sende kalıcak",
  "Senin gülüşün benim en sevdiğim mevsim.",
    "Bazen öyle güzel gülüyorsun ki, bütün dünya kör olsun istiyorum. ",
  "Güneş mi doğdu yoksa sen mi uyandın?",
  "Bugün yine o kadar güzelsin ki gözlerim kamaştı.",
  "Aşk acı ise sen niye tatlısın?",
  "Kalbimde öyle bir cümlesin ki nokta koymaya bile yer bulamıyorum.",
  "O gülüşündeki gamze olmak isterim güzelliğine güzellik katmak için...",
  "O kadar güzelsin ki, manzaralar seni seyretsin.",
  "Saçlarının bir teli olmak isterdim hep yanında kalmak için.",
  "Yürüdüğün yol olmak isterim, hiç aksamadan seni yürütmek için bu hayatta.",
  "Dertlerini bana ver sevinçler senin olsun, sen sevilmeye değersin.",
  "Seni özlediğim kadar kimseyi özlemedim. Gecelerim kıskanır oldu artık sana çektiğim hasreti.",
  "Aslında dünyanın 7 harikası yok 1 tane harikası var; O da senin kalbin",
  "Seni dünyanın en güzel 8. harikası seçiyorum."
];

client.on("message", async(message) => {
  if(message.channel.id !== "CHAT KANAL İD") return;
  Chat++;
  if(Chat === 80){
    Chat = 0;
    message.inlineReply(`${ilitfat[Math.floor(Math.random() * ilitfat.length + 1)]}`);
  }
})