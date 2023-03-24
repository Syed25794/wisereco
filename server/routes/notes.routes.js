const { Router } = require("express");

const noteRoutes = Router();

noteRoutes.get("/getNotes");
noteRoutes.post("/createNote");
noteRoutes.patch("/:id");
noteRoutes.delete("/:id");

module.exports = noteRoutes ; 