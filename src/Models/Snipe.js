const mongoose = require("mongoose");

let Snipe = new mongoose.Schema({
GuildID: String,
 userID: String,
 Content: String
})

module.exports = mongoose.model("Snipe", Snipe)