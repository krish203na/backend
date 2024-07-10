const asyncHandler = require("../../utils/asyncHandler")
const User = require("../../Models/user.model")


const registerUser = asyncHandler(async (req, res) => {

    // const { userid, username, email, fullname } = req.body

    // try {
    //     const existingUser = await User.findOne({ userid });

    //     if (existingUser) {
    //         return res.status(200).json({ message: 'User already exists' });
    //     }

    //     const user = new User({
    //         userid,
    //         username,
    //         email,
    //         fullname
    //     });

    //     await user.save();
    //     res.status(201).json(user);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }


    // ========================= second approch ============================

    const { userId, email, fullName, username } = req.body;

    try {
        let user = await User.findOne({ userid: userId });

        if (!user) {

            user = new User({
                userid: userId,
                username,
                email,
                fullname: fullName
            });

        } else {

            user.email = email;
            user.username = username;
            user.fullname = fullName;


        }
        user = await user.save(); // This line saves a new user document

        res.status(200).json({ message: 'User data saved', user });
    } catch (error) {
        console.error('Error saving/updating user data:', error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = registerUser;