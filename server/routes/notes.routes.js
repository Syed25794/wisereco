const { Router } = require("express");

const noteRoutes = Router();

noteRoutes.get("/getNotes");
noteRoutes.post("/createNote");
noteRoutes.patch("/updateNote");
noteRoutes.delete("/deleteNote");

module.exports = noteRoutes ; 