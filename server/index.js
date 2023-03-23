const express = require("express");
const connection = require("./config/database");
require("dotenv").config();

const application = express();
const { PORT } = process.env || 8000;

application.use(express.json());


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


