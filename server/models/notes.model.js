const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:String,
    tagline:String,
    body:String,
    isPinned:Boolean,
    image:String,
    background_color:String
},{timestamps:true});

const Note = mongoose.model("note",noteSchema);

module.exports = Note; 