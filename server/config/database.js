const mongoose = require("mongoose");
require("dotenv").config();

//Getting mongodb_url from .env file
const { MONGO_URL } = process.env ;

//Connecting with the database using the mongodb_url
const connection = mongoose.connect(MONGO_URL);

module.exports = connection ; 
