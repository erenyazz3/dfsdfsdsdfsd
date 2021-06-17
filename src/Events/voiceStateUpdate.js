const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = async(oldState, newState) => {
  if(oldState.member.user.bot) return;
  if(newState.member.nickname === null) return;
  if(!newState.member.nickname.includes("|")) return;

///+18 SES SİSTEMİ

  if (!oldState.channelID && newState.channelID) {
    let Channel = ["ENGELLEMSİNİ İSTEDİĞİN KANALLARIN İDSİ","","",""].includes(newState.channelID);
    if(Channel === true) {
let Age = newState.member.nickname.split(" | ")[1];
if(Age < 18){
    await oldState.member.voice.setChannel(null);
}
  };
};

if (oldState.channelID && newState.channelID) {
  let Channel = ["ENGELLEMSİNİ İSTEDİĞİN KANALLARIN İDSİ","","",""].includes(newState.channelID);

    if(Channel === true) {
let Age = newState.member.nickname.split(" | ")[1];
if(Age < 18){
    await oldState.member.voice.setChannel(null);
}
  };
}

};

module.exports.configuration = {
  name: "voiceStateUpdate"
};

