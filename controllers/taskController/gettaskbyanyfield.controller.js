const asyncHandler = require("../../utils/asyncHandler");
const Task = require("../../Models/task.model");

const getTaskbyfield = asyncHandler(async (req, res) => {
    try {
        const query = req.params.id.trim(); 
        const task = await Task.find({
            $or: [
                { taskname: { $regex: query, $options: 'i' } },       
                { taskdescription: { $regex: query, $options: 'i' } },
                { taskpriority: { $regex: query, $options: 'i' } },   
                { taskstatus: { $regex: query, $options: 'i' } },     
                { taskend: { $regex: query, $options: 'i' } },        
            ]
        });

        if (!task.length) { 
            return res.status(404).send('Task not found');
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = getTaskbyfield;

