const mongoose = require("mongoose");

const Bookschema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userid: { type: String },
    username: { type: String }
}, { versionKey: false })


const Bookmodel = mongoose.model("note", Bookschema);

module.exports = Bookmodel