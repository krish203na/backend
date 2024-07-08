const asyncHandler = require("../../utils/asyncHandler")
const User = require("../../Models/user.model")


const updateUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userid, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = updateUser;