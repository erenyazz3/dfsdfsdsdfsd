const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

if(message.channel.id !== config.channel.botkomut) return;

if(!args[0]) return message.channel.send("Bir argüman belirtmelisin. `yönetici/mod/reg`");

if(args[0] === "reg" || args[0] === "register"){
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
  .setDescription(` 
  :white_small_square: **REGİSTER KOMUTLARI** :white_small_square: 
  
  \`>\` ${config.prefix}erkek \`@Etiket/ID\` \`isim\` \`yaş\`: Kullanıcıyı erkek olarak kayıt eder. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}kız \`@Etiket/ID\` \`isim\` \`yaş\`: Kullanıcıyı kız olarak kayıt eder. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}isimler \`@Etiket/ID\`: Kullanıcı hangi isimde hangi rolde kayıt olduğunu gösterir. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}kayıtsız \`@Etiket/ID\` \`Sebep\`: Etiketlenen kullanıcıyı kayıtsıza atar. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}sorgu \`@Etiket/ID\`: Kaç kişiyi kayıt ettiğini gösterir. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}teyit \`@Etiket/ID\`: Teyit ettiği kullanıcı sayısını gösterir. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}ksıralama: En çok kayıt yapanları listeler. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}isim \`@Etiket/ID\` \`İsim\` \`Yaş\`: Kullanıcın ismini ve yaşını değiştirirsiniz. (<@&${config.mod.reg}>)
  `)
  .setTimestamp()
  message.channel.send(embed)
  }

if(args[0] === "yönetici" || args[0] === "yonetici"){
let embed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
.setDescription(`
:white_small_square: **YÖNETİCİ KOMUTLARI** :white_small_square: 
\`>\` ${config.prefix}cihaz \`@Etiket/ID\`: kullanıcın hangi cihazdan bağlandığını gösterir. (<@&${config.mod.owner}>)
\`>\` ${config.prefix}katıldı \`ver/al\`: Toplantıya katılmış olan üyelere rol verir veya alır. (<@&${config.mod.owner}>)
\`>\` ${config.prefix}rol-sorgu \`@Etiket/ID\`: Rol hakkında bilgi verir. (<@&${config.mod.owner}>) [<#${config.channel.adminChannel}>]
\`>\` ${config.prefix}ses-kontrol: Hangi yetkililer sesde değil onu gösterir. (<@&${config.mod.owner}>) [<#${config.channel.staffchat}>]
\`>\` ${config.prefix}snipe: Son silinen mesajı gösterir. (<@&${config.mod.owner}>)
\`>\` ${config.prefix}vip \`@Etiket/ID\`: Etiketlenen kullanıcıya vip rolü verilir. (<@&${config.mod.owner}>)
\`>\` ${config.prefix}ykontol: Yetkililer hakkında bilgi verir. (<@&${config.mod.owner}>)
\`>\` ${config.prefix}emoji \`Emoji\`: İstenilen emojiyi yükler. (<@796521211617607700>)
\`>\` ${config.prefix}yasaklı-tag \`ekle/çıkar/listele\`: Yasaklı tag ekler veya çıkarırsınız. (<@796521211617607700>)
\`>\` ${config.prefix}taglı-alım \`aç/kapat\` : Taglı alımı açar veya kapatırsınız. (<@&${config.mod.owner}>)
`)
.setTimestamp()
message.channel.send(embed)
}


if(args[0] === "mod" || args[0] === "moderasyon"){
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
  .setDescription(`
  :white_small_square: **MODERASYON KOMUTLARI** :white_small_square: 

  \`>\` ${config.prefix}nerede \`@Etiket/ID\`: Etiketlenen kullanıcı hangi kanalda olduğunu gösterir. (<@&${config.mod.sponsor}>)
  \`>\` ${config.prefix}say: Sunucu hakkında bilgi verir. (<@&${config.mod.reg}>)
  \`>\` ${config.prefix}sil \`Miktar\` : Girilen sayı kadar mesaj siler. (**MESAJ_SİLME YETKİSİ**)
  \`>\` ${config.prefix}afk \`sebep\` : Afk moduna girmenize yarar. (**EVERYONE**)
  \`>\` ${config.prefix}ban \`@Etiket/id\` \`Sebep\` : Kullanıcıyı banlar. (<@&${config.mod.ban}>)
  \`>\` ${config.prefix}mute \`@Etiket/id\` \`Süre\` \`Sebep\` : Süreli olarak kullanıcıyı susturur. (<@&${config.mod.chatmute}>)
  \`>\` ${config.prefix}çek \`@Etiket/id\` : Kullanıcıyı yanınıza çekersiniz. (**EVERYONE**)
  \`>\` ${config.prefix}git \`@Etiket/id\` : Etiketlenen kullanıcının yanında gidersiniz. (**EVERYONE**)
  \`>\` ${config.prefix}jail \`@Etiket/id\` \`Sebep\` : Kullanıcıyı jaile atar süresiz. (<@&${config.mod.jail}>)
  \`>\` ${config.prefix}jail-sorgu \`@Etiket/id\` : Kullanıcın jail geçmişine bakarsınız. (<@&${config.mod.jail}>)
  \`>\` ${config.prefix}kick \`@Etiket/id\` \`Sebep\` : Etiketlenen kullanıcıyı sunucudan atar. (<@&${config.mod.jail}>)
  \`>\` ${config.prefix}sicil \`@Etiket/id\` : Kullanıcın ceza geçmişine bakarsınız. (<@&${config.mod.jail}>)
  \`>\` ${config.prefix}unban \`id\` : İdsi girilen kullanıcının banını kaldırsınız. (<@&${config.mod.ban}>)
  \`>\` ${config.prefix}unjail \`@Etiket/id\` : Kullanıcıyı jailden çıkarır. (<@&${config.mod.jail}>)
  \`>\` ${config.prefix}unmute \`@Etiket/id\` \`Sebep\`: Etiketlenen kullanıcının mutesini kaldırır. (<@&${config.mod.chatmute}>)
  \`>\` ${config.prefix}v-mute \`@Etiket/id\` \`Sebep\`: Kullanıcın sesdeki mutesini kaldırır. (<@&${config.mod.chatmute}>)
  \`>\` ${config.prefix}vunmute \`@Etiket/id\` \`Sebep\`: Kullanıcıyı sesde susturur. (<@&${config.mod.chatmute}>)
  \`>\` ${config.prefix}herkesi-çek \`kanalID\`: Bütün herkesi idsi girilen kanala taşır. (<@&${config.mod.owner}>)
  `)
  .setTimestamp()
  message.channel.send(embed)
  }



};
exports.configuration = {
  CommandName: ["help","yardım"],
  description: "Yardım komutunu gösterir.",
  usage: "yardım"
};