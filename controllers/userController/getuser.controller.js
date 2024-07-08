// const asyncHandler = require("../../utils/asyncHandler")
// const User = require("../../Models/user.model")

// const getUser = asyncHandler(async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.params.id });
//         if (!user) {
//             console.log(exicuting)
//             return res.status(404).send('User not found');
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).send('Error fetching user data');
//     }
// })

// module.exports = getUser;



const asyncHandler = require("../../utils/asyncHandler");
const User = require("../../Models/user.model");

const getUser = asyncHandler(async (req, res) => {
    try {
        const query = req.params.id.trim(); // Trim any whitespace
        const user = await User.findOne({
            $or: [
                { username: query },
                { fullname: query },
                { email: query },
                { userid: query },
                // { _id: query }
            ]
        }).collation({ locale: 'en', strength: 2 }); // Case-insensitive search

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = getUser;
