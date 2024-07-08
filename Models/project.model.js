const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectid:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim:true
    },
    projectname:{
        type:String,
        required:true,
    },
    projectdescription:{
        type:String
    },
    projectend: {
        type: String,
        required: true,
    },
    projectstatus: {
        type: String,
        enum: ["running", "terminated", "completed"],
        required: true,
    },
    projectteam:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    projectleader:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    projecttasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    projectdepartments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"  
        }
    ]

},{timestamps:true})

module.exports = mongoose.model("Project", projectSchema)  