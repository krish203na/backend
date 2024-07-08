// const asyncHandler = require("../../utils/asyncHandler")
// const Task = require("../../Models/task.model")

// const updateTask = asyncHandler(async (req, res) => {
//     const taskid = req.params.id;
//     const updates = req.body;

//     try {
//         const updatedTask = await Task.findByIdAndUpdate(taskid, updates, { new: true });

//         if (!updatedTask) {
//             return res.status(404).json({ message: 'Task not found' });
//         }

//         res.status(200).json(updatedTask);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// module.exports = updateTask;


const asyncHandler = require("../../utils/asyncHandler");
const Task = require("../../Models/task.model");

const updateTask = asyncHandler(async (req, res) => {
    const taskid = req.params.id;
    const updates = req.body;

    try {
        // Check if new collaborators are provided
        if (updates.taskcollaborators && updates.taskcollaborators.length > 0) {
            // Fetch the current task to get existing collaborators
            const existingTask = await Task.findById(taskid);
            if (!existingTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Filter out duplicates from new collaborators
            updates.taskcollaborators = updates.taskcollaborators.filter(collaborator => (
                !existingTask.taskcollaborators.includes(collaborator)
            ));
        }

        // Update the task with filtered updates
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
