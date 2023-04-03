const mongoose = require("mongoose");


//Creating notes schema 
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    text: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    image: { type: String , default: "" },
    background_color: { type: String, default: "" },
  },
  { timestamps: true, versionKey:false }
);


//Creating note model
const Note = mongoose.model("note", noteSchema);

module.exports = Note;
