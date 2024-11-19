const { Router } = require("express");
const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/notes.controllers");

const noteRoutes = Router();

//defining all the routes with their http vers
noteRoutes.get("/getNotes",getNotes);
noteRoutes.post("/createNote",createNote);
noteRoutes.patch("/updateNote",updateNote);
noteRoutes.delete("/deleteNote",deleteNote);

module.exports = noteRoutes ; 