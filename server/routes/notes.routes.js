const { Router } = require("express");
const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/notes.controllers");

const noteRoutes = Router();

noteRoutes.get("/getNotes",getNotes);
noteRoutes.post("/createNote",createNote);
noteRoutes.patch("/:id",updateNote);
noteRoutes.delete("/:id",deleteNote);

module.exports = noteRoutes ; 