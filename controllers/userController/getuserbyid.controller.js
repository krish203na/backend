
const asyncHandler = require("../../utils/asyncHandler");
const User = require("../../Models/user.model");

const getUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error fetching user data');
    }
});

module.exports = getUserById;