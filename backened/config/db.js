const mongoose = require('mongoose');

require('dotenv').config();

dbconnect=async()=>{
    try {
        const response=await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Database connection failed:", error);    
        process.exit(1);
    }
}
module.exports = dbconnect;