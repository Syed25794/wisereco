const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env ;

const connection = mongoose.connect(MONGO_URL);

module.exports = connection ; 
