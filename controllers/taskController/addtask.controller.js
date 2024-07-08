const asyncHandler = require("../../utils/asyncHandler")
const Task = require("../../Models/task.model")
const User = require("../../Models/user.model")

const addTask = asyncHandler(async (req, res) => {

    const { taskid, taskname, taskdescription, taskpriority, taskstatus, taskend, taskowner, taskcollaborators, taskcomments } = req.body

    try {
        const task = new Task({
            taskid,
            taskname,
            taskdescription,
            taskpriority,
            taskstatus,
            taskend,
            taskowner,
            taskcollaborators,
            taskcomments
        });
        
        await task.save()
        await User.findByIdAndUpdate(
            taskowner,
            { $push: { tasks: task._id } },
            { new: true }
        )
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = addTask;