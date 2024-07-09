const Router = require("express");
const addTask = require("../controllers/taskController/addtask.controller")
const getTask = require("../controllers/taskController/gettask.controller")
const updateTask = require("../controllers/taskController/updatetask.controller")
const deleteTask = require("../controllers/taskController/deletetask.controller")
const getTaskbyfield = require("../controllers/taskController/gettaskbyanyfield.controller")

const router = Router()

router.route("/make").post(addTask)
router.route("/:id").get(getTask)
router.route("/get/:id").get(getTaskbyfield)
router.route("/update/:id").put(updateTask)
router.route("/delete/:id").delete(deleteTask)


module.exports = router;