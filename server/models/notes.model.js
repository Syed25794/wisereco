const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    body: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    image: { type: String, default: "" },
    background_color: { type: String, default: "" },
  },
  { timestamps: true, versionKey:false }
);

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
