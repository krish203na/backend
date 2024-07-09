const asyncHandler = require("../../utils/asyncHandler")
const User = require("../../Models/user.model")


const registerUser = asyncHandler(async (req, res) => {

    const { userid, username, email, fullname } = req.body

    try {
        const existingUser = await User.findOne({ userid });

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists' });
        }

        const user = new User({
            userid,
            username,
            email,
            fullname
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = registerUser;