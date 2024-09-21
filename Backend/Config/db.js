const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
};

module.exports = connectDB;
