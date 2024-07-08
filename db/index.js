const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require("../Models/user.model")
const Task = require("../Models/task.model")
const Project = require("../Models/project.model")

dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    }
    catch (error) {
        console.log("database connection error", error);
        process.exit(1)
    }
}

module.exports = connectDB
