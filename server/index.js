const express = require("express");
const connection = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const noteRoutes = require("./routes/notes.routes");

const application = express();
const { PORT } = process.env || 8000;

//Using express middleware , cors and defining routes
application.use(express.json( { limit : '10000kb' , extended : true }));
application.use(express.urlencoded({ limit : '10000kb' , extended : true , parameterLimit : 50000}))
application.use(cors());
application.use("/notes",noteRoutes);

//Home page routes message
application.get("/",(req,res)=>{
    res.send("<h1>Welcome to Home Page.</h1>");
});

//Listing the server and running database also
application.listen(PORT,async()=>{
    try {
        console.log(`Server is running on the localhost port : ${PORT}`);
        await connection;
        console.log(`Server is connected.`);
    } catch (error) {
        console.log('Something went wrong connection with database.');
    }
});


