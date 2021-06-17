const mongoose = require("mongoose");

let cezalar = new mongoose.Schema({
    ceza: String,
    mod: String,
    user: String,
    duration: Number,
    reason: String
})

module.exports = mongoose.model("Ceza", cezalar)