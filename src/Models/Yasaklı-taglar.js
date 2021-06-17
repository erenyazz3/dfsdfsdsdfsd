const mongoose = require("mongoose");

let yasaklıtag = new mongoose.Schema({
Tag: String,
mod: String,
GuildID: String
})

module.exports = mongoose.model("YasaklıTaglar", yasaklıtag)