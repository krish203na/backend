const asyncHandler = require("../../utils/asyncHandler")
const Task = require("../../Models/task.model")

const getTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            console.log(exicuting)
            return res.status(404).send('task not found');
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send('Error fetching task data', error);
    }
})

module.exports = getTask;