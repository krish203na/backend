const asyncHandler = require("../../utils/asyncHandler")
const Task = require("../../Models/task.model")
const User = require("../../Models/user.model")

const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id; 
    

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(taskId);

        await User.findByIdAndUpdate(
            task.taskowner,
            { $pull: { tasks: taskId } },
            { new: true }
        );

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = deleteTask;