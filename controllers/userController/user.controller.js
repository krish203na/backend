const asyncHandler = require("../../utils/asyncHandler")
const User = require("../../Models/user.model")


const registerUser = asyncHandler(async (req, res) => {

    const { userid, username, email, fullname } = req.body

    try {
        const existingUser = await User.findOne({ userid });

        if (existingUser) {
            // console.log("user exit  already!!!!")
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

// const getUser = asyncHandler(async (req, res) => {
//     try {
//         const user = await User.findOne({ userid: req.params.id });
//         if (!user) {
//             console.log(exicuting)
//             return res.status(404).send('User not found');
//         }
//         console.log("catching")
//         res.status(200).json(user);
//     } catch (error) {
//         console.log("catching")
//         res.status(500).send('Error fetching user data');
//     }
// })


module.exports = registerUser;
// module.exports = getUser;