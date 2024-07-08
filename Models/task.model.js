const mongoose = require("mongoose")

const taskComment = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    commentauthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

const taskSchema = new mongoose.Schema({

    taskid: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    taskname: {
        type: String,
        required: true,
        trim: true
    },
    taskdescription: {
        type: String,
        trim: true
    },
    taskpriority: {
        type: String,
        enum: ["high", "moderate", "low"],
        required: true,
    },
    taskstatus: {
        type: String,
        enum: ["running", "terminated", "completed"],
        required: true,
    },
    taskend:{
        type:String,
        required:true
    },
    taskowner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    taskcollaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    taskcomments: [{taskComment}]

}, {
    timestamps: true
})

module.exports = mongoose.model("Task", taskSchema)  