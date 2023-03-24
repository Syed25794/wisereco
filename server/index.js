const express = require("express");
const connection = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const noteRoutes = require("./routes/notes.routes");

const application = express();
const { PORT } = process.env || 8000;

application.use(express.json());
application.use(cors());
application.use("/notes",noteRoutes);


application.get("/",(req,res)=>{
    res.send("<h1>Welcome to Home Page.</h1>");
});

application.listen(PORT,async()=>{
    try {
        console.log(`Server is running on the localhost port : ${PORT}`);
        await connection;
        console.log(`Server is connected.`);
    } catch (error) {
        console.log('Something went wrong connection with database.');
    }
});


