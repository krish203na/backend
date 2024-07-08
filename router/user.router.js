const Router = require("express");
const registerUser = require("../controllers/userController/user.controller")
const getUser = require("../controllers/userController/getuser.controller")
const updateUser = require("../controllers/userController/updateuser.controller");
const getUserById = require("../controllers/userController/getuserbyid.controller");

const router = Router()


router.route("/register").post(registerUser)
router.route("/:id").get(getUser)
router.route("/id/:id").get(getUserById)
router.route("/update/:id").put(updateUser)

module.exports = router;