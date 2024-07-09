const asyncHandler = require("../../utils/asyncHandler");
const Task = require("../../Models/task.model");

const updateTask = asyncHandler(async (req, res) => {
    const taskid = req.params.id;
    const updates = req.body;

    try {
        if (updates.taskcollaborators && updates.taskcollaborators.length > 0) {
            const existingTask = await Task.findById(taskid);
            if (!existingTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            updates.taskcollaborators = updates.taskcollaborators.filter(collaborator => (
                !existingTask.taskcollaborators.includes(collaborator)
            ));
        }

        const updatedTask = await Task.findByIdAndUpdate(taskid, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = updateTask;
